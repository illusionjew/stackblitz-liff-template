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
const district_selector = document.getElementById('DistrictData');
const subdistrict_selector = document.getElementById('SubdistrictData');

async function main() {
  await liff.init({
    liffId: '1657263880-bNJ3z7yx',
    withLoginOnExternalBrowser: true,
  });
  const cid = getUserProfile();
  document
    .querySelector('meta[name="header_id"]')
    .setAttribute('content', genTK(cid));
  initialBirthSelector();
  initialBoundarySelector();
}
main();

async function getUserProfile() {
  const user_profile = await liff.getProfile();
  document.getElementById('ClientId').value = user_profile.userId;
  // user_profile.pictureUrl;
  // user_profile.displayName;
  // user_profile.statusMessage;
  return user_profile.userId;
}

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
    province_selector.appendChild(prov_opt);
  });
  district_array.forEach((district) => {
    let dist_opt = document.createElement('option');
    dist_opt.text = district.name_th;
    dist_opt.value = district.name_th;
    dist_opt.id = district.parent_th + '-' + district.name_th;
    dist_opt.className = district.parent_th;
    district_selector.appendChild(dist_opt);
  });
  subdistrict_array.forEach((subd) => {
    let subd_opt = document.createElement('option');
    subd_opt.text = subd.name_th;
    subd_opt.value = subd.name_th;
    subd_opt.id = subd.root_th + '-' + subd.parent_th + '-' + subd.name_th;
    subd_opt.className = subd.root_th + '-' + subd.parent_th;
    subdistrict_selector.appendChild(subd_opt);
  });
}

function genTK(contact) {
  let crypto = require('crypto');
  let tenant = 'TSpace';
  let location = 'LineOA Zeatunaessence';
  let t = new Date();
  let date = ('0' + t.getDate()).slice(-2);
  let month = ('0' + (t.getMonth() + 1)).slice(-2);
  let year = t.getFullYear();
  let body = `${location}${contact}${tenant}${year}${month}${date}`;
  let hash = crypto
    .createHmac('SHA256', '1TTh@ib3v')
    .update(body)
    .digest('base64');
  return hash;
}

function submitForm() {
  let req_url = 'https://ai-services.tspace.tech/zeatuna/customer/';
  let prefix_sel = document.getElementById('PrefixSelector').value;
  if (prefix_sel == 'อื่น ๆ') {
    prefix_sel = document.getElementById('PrefixInput').value;
  }

  let firstname_val = document.getElementById('FirstnameInput').value;
  let surname_val = document.getElementById('SurnameInput').value;
  let phone_val = document.getElementById('PhoneInput').value;
  let address_val = document.getElementById('AddressInput').value;
  let postcode_val = document.getElementById('PostcodeInput').value;
  let prov_val = document.getElementById('ProvinceSelector').value;
  let dis_val = document.getElementById('DistrictSelector').value;
  let subd_val = document.getElementById('SubdistrictSelector').value;
  let d_val = document.getElementById('BirthDateSelector').value;
  let m_val = document.getElementById('BirthMonthSelector').value;
  let y_val = document.getElementById('BirthYearSelector').value;
  if (
    firstname_val != '' &&
    surname_val != '' &&
    phone_val != '' &&
    address_val != '' &&
    postcode_val != '' &&
    prov_val != 'เลือกจังหวัด' &&
    dis_val != 'เลือกอำเภอ/เขต' &&
    subd_val != 'เลือกตำบล/แขวง' &&
    d_val != 'dd' &&
    m_val != 'mm' &&
    y_val != 'yyyy'
  ) {
    let json_data = {
      line_id: document.getElementById('ClientId').value,
      title: prefix_sel,
      first_name: firstname_val,
      last_name: surname_val,
      nick_name: document.getElementById('NucknameInput').value,
      gender: $('#GenderSelector input:radio:checked').val(),
      birthdate: y_val + '-' + m_val + '-' + d_val,
      phone_number: phone_val,
      email: document.getElementById('EmailInput').value,
      address: address_val,
      province: prov_val,
      district: dis_val,
      sub_district: subd_val,
      postcode: postcode_val,
    };
    console.log(json_data);

    $.ajax({
      type: 'POST',
      url: req_url,
      contentType: 'application/json',
      // headers: { apikey: api_key },
      dataType: 'json',
      data: JSON.stringify(json_data),
      success: function (response) {
        alert('ขอบคุณที่ลงทะเบียนเข้าร่วมกิจกรรมกับเรา');
        liff.closeWindow();
      },
      error: function (err) {
        console.log(err);
      },
    });
  } else {
    alert('กรุณากรอกข้อมูลในช่องที่มีเครื่องหมาย * ให้ครบถ้วน');
  }
}

document.getElementById('SubmitForm').onclick = () => {
  submitForm();
};
