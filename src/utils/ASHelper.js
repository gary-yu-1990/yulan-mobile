import { $http } from "../main";

export default class ASHelper {
  flag = 1;
  how2load = [
    () => $http.post('/areaRegion/getProvince.do').then(
      ({ data }) => {
        this.provinces = data.province;
        this.selecteds[0] = data.province[0];
      }
    ),

    () => $http.post(
      '/areaRegion/getCity.do', this.selecteds[0]
    ).then(({ data }) => {
      this.cities = data.city;
      // if(data.city == []){
      //   flag = 0;
      // }
      // else{
      //   flag = 1;
      // }
      this.selecteds[1] = data.city[0];
    }),

    () => $http.post(
      '/areaRegion/getCountry.do', this.selecteds[1]
    ).then(({ data }) => {
      this.towns = data.country;
      // 某些地方，只有两级选择，因此此处可能是 UNDEFINED
      this.selecteds[2] = data.country[0];
    })
  ]

  constructor() {
    this.provinces = [];
    this.cities = [];
    this.towns = [];
    this.selecteds = [];
  }
  init() {
    const [ loadProvinces, loadCities, loadTowns ] = this.how2load;

    return loadProvinces().then(provincesLoaded => {
      return loadCities();
    }).then(citiesLoaded => {
      return loadTowns();
    });
  }

  oneByOne(tasks) {
    console.log(tasks)
    if (tasks.length === 0) return Promise.resolve('ok');

    const [now2load, ...rest] = tasks;

    return now2load().then(() => {
      return this.oneByOne(rest);
    });
  }

  /**
   *
   * @param { Array } newSelecteds
   */
  onChange(newSelecteds) {
    let i;
    console.log(newSelecteds)
    // console.log(flag)
   
    for (i = 0; i < newSelecteds.length; i++) {
      if (newSelecteds[i].regionId !== this.selecteds[i].regionId) {
        break;
      }
    }

    newSelecteds.forEach(($, i) => this.selecteds[i] = $);

    console.log('onchange i:', i);

    return this.oneByOne(this.how2load.slice(i + 1));
  }

  asParam() {
    return [
      {
        values: this.provinces,
        className: 'province'
      },
      {
        values: this.cities,
        className: 'city'
      },
      {
        values: this.towns,
        className: 'town'
      }
    ]
  }
}
