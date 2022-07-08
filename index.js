// Import stylesheets
import './style.css';

// Import LIFF
import liff from '@line/liff';

import boundary_data from './assets/province.json';

const province_array = boundary_data.Province;
const district_array = boundary_data.District;
const subdistrict_array = boundary_data.Subdistrict;

const month_dict = {
  1: 'มกราคม',
  2: 'กุมภาพันธ์',
  3: 'มีนาคม',
  4: 'เมษายน',
  5: 'พฤษภาคม',
  6: 'มิถุนายน',
  7: 'กรกฎาคม',
  8: 'สิงหาคม',
  9: 'กันยายน',
  10: 'ตุลาคม',
  11: 'พฤศจิกายน',
  12: 'ธันวาคม',
};

// get html element
const birth_date_selector = document.getElementById('BirthDateSelector');
const birth_month_selector = document.getElementById('BirthMonthSelector');
const birth_year_selector = document.getElementById('BirthYearSelector');
const province_selector = document.getElementById('ProvinceSelector');
const district_selector = document.getElementById('DistrictSelector');
const subdistrict_selector = document.getElementById('SubdistrictSelector');

async function main() {
  initialBirthSelector();
  initialBoundarySelector();
  // getUserProfile();
  await liff.init({
    liffId: '1657263880-bNJ3z7yx',
    // withLoginOnExternalBrowser: true
  });
}
main();

// async function getUserProfile() {
//   const user_profile = await liff.getProfile();
//   profile_url.src = user_profile.pictureUrl;
//   display_name.innerHTML =
//     '<b>Line display name : ' + user_profile.displayName + '</b>';
//   status_msg.innerHTML =
//     '<b>Line status : ' + user_profile.statusMessage + '</b>';
// }

function initialBirthSelector() {
  const current = new Date();
  for (let i = current.getFullYear(); i > 1930; i--) {
    var option = document.createElement('option');
    option.text = i + 543;
    option.value = i;
    option.id = 'year' + i;
    birth_year_selector.appendChild(option);
  }

  for (let j = 1; j < 13; j++) {
    var option = document.createElement('option');
    option.text = month_dict[j];
    option.value = j;
    option.id = 'month' + j;
    birth_month_selector.appendChild(option);
  }

  for (let k = 1; k < 32; k++) {
    var option = document.createElement('option');
    option.text = k;
    option.value = k;
    option.id = 'date' + k;
    birth_date_selector.appendChild(option);
  }
}

function initialBoundarySelector() {
  let province_sorted = province_array.sort((a, b) =>
    a.name_th > b.name_th ? 1 : b.name_th > a.name_th ? -1 : 0
  );
  province_sorted.forEach((province) => {
    let prov_opt = document.createElement('option');
    prov_opt.text = province.name_th;
    prov_opt.value = province.name_th;
    prov_opt.id = province.name_th;
    province_array.appendChild(prov_opt);
  });
}
