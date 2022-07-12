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
  // document
  //   .querySelector('meta[name="header_id"]')
  //   .setAttribute('content', genTK(cid));
  // initialBirthSelector();
  // initialBoundarySelector();
}
main();

async function getUserProfile() {
  const user_profile = await liff.getProfile();
  // user_profile.pictureUrl;
  // user_profile.displayName;
  // user_profile.statusMessage;
  fetchConsent(user_profile.userId);
  return user_profile.userId;
}

function filterDistrict() {
  let prov_sel = document.getElementById('ProvinceSelector').value;
  const dist_selector = document.getElementById('DistrictSelector');
  dist_selector.innerHTML = '';
  document.getElementById('SubdistrictSelector').innerHTML =
    '<option selected>เลือกตำบล/แขวง</option>';
  if (prov_sel != 'เลือกจังหวัด') {
    let sct = '.' + prov_sel;
    let opts = document.querySelectorAll(sct);
    opts.forEach((o) => dist_selector.appendChild(o));
  }
}

function filterSubdistrict() {
  let prov_sel = document.getElementById('ProvinceSelector').value;
  let dist_sel = document.getElementById('DistrictSelector').value;
  const subd_selector = document.getElementById('SubdistrictSelector');
  subd_selector.innerHTML = '';
  if (prov_sel != 'เลือกจังหวัด') {
    let sct = '.' + prov_sel + '-' + dist_sel;
    let opts = document.querySelectorAll(sct);
    opts.forEach((o) => subd_selector.appendChild(o));
  }
}

function togglePrefixInput() {
  let prefix_selected = document.getElementById('PrefixSelector').value;
  if (prefix_selected == 'อื่น ๆ') {
    document.getElementById('PrefixnameDiv').style.display = 'block';
  } else {
    document.getElementById('PrefixnameDiv').style.display = 'none';
  }
}

function dateFilterByMonth() {
  const date_selector = document.getElementById('BirthDateSelector');
  let mth_selected = document.getElementById('BirthMonthSelector').value;
  let yrs_selected = document.getElementById('BirthYearSelector').value;

  if (document.getElementById('date29') == undefined) {
    let opt29 = document.createElement('option');
    opt29.text = 29;
    opt29.value = 29;
    opt29.id = 'date29';
    date_selector.appendChild(opt29);
  }

  if (document.getElementById('date30') == undefined) {
    let opt30 = document.createElement('option');
    opt30.text = 30;
    opt30.value = 30;
    opt30.id = 'date30';
    date_selector.appendChild(opt30);
  }

  if (document.getElementById('date31') == undefined) {
    let opt31 = document.createElement('option');
    opt31.text = 31;
    opt31.value = 31;
    opt31.id = 'date31';
    date_selector.appendChild(opt31);
  }

  if (['2', '4', '6', '9', '11'].includes(mth_selected)) {
    if (document.getElementById('date31') != undefined) {
      date_selector.removeChild(document.getElementById('date31'));
    }

    if (mth_selected == '2') {
      date_selector.removeChild(document.getElementById('date30'));
      if (yrs_selected != 'yyyy') {
        let y = parseInt(yrs_selected);
        if (!((y % 4 == 0 && y % 100) || y % 400 == 0)) {
          date_selector.removeChild(document.getElementById('date29'));
        }
      }
    }
  }
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
      gender: document.querySelector('input.form-check-input:checked').value,
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

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      console.log(this.getAllResponseHeaders());
      // alert('ขอบคุณที่ลงทะเบียนเข้าร่วมกิจกรรมกับเรา');
      // liff.closeWindow();
    };
    xhr.open('POST', req_url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json_data));
  } else {
    alert('กรุณากรอกข้อมูลในช่องที่มีเครื่องหมาย * ให้ครบถ้วน');
  }
}

// document.getElementById('SubmitForm').onclick = () => {
//   submitForm();
// };

function fetchConsent(cid) {
  let tk = genTK(cid);
  let req_url =
    'https://oth1uat.apps.thaibev.com/thaibevconsentapi/v1/Content/GetConsentByApp';
  let json_req = {
    appCode: '54BCA334-D935-4F52-9187-EE080F1C22F2',
    userId: cid,
    lang: 'th',
    isRegister: 'true',
    consentType: 'A',
  };
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      const resp = JSON.parse(xhr.response);
      console.log(resp);
      const div_content = document.getElementById('content-body');
      div_content.innerHTML =
        resp.content + '<br><form id="ConsentForm"></form>';
      resp.consentList.forEach((item) => {
        let confm = document.getElementById('ConsentForm');
        let tag =
          '<input type="checkbox" id="ConsentId' +
          item.consentListId +
          '" name="ConsentId' +
          item.consentListId +
          '" value="ConsentId' +
          item.consentListId +
          '"><label style="display: inline !important; width:90%;" for="ConsentId' +
          item.consentListId +
          '">' +
          item.description +
          '</label><br>';
        confm.innerHTML = confm.innerHTML + tag;
      });
      div_content.innerHTML =
        div_content.innerHTML +
        '<button type="button" id="BtnRejectConsent">' +
        resp.cancelText +
        '</button><button type="button" id="BtnSaveConsent" disabled>' +
        resp.submitText +
        '</button><br>';
      document.getElementById('ConsentId1').onclick = () => {
        enableSaveBtn();
      };
      document.getElementById('BtnRejectConsent').onclick = () => {
        liff.closeWindow();
      };
      document.getElementById('BtnSaveConsent').onclick = () => {
        saveConsent(resp, tk);
      };
    }
  };
  xhr.open('POST', req_url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('tenant', 'TSpace');
  xhr.setRequestHeader('location', 'LineOA Zeatunaessence');
  xhr.setRequestHeader('contact', cid);
  xhr.setRequestHeader('sender', 'Thaibev-it');
  xhr.setRequestHeader('signature', tk);
  xhr.setRequestHeader('SecretKey', '1TTh@ib3v');
  xhr.send(JSON.stringify(json_req));
}

function enableSaveBtn() {
  const req_chk = document.getElementById('ConsentId1');
  if (req_chk.checked) {
    document.getElementById('BtnSaveConsent').disabled = false;
  } else {
    document.getElementById('BtnSaveConsent').disabled = true;
  }
}

function saveConsent(fetch_json, tk) {
  let req_url =
    'https://oth1uat.apps.thaibev.com/thaibevconsentapi/v1/Content/SaveConsentByUser';
  let consent1 = document.getElementById('ConsentId1').checked ? 'Yes' : 'No';
  let consent2 = document.getElementById('ConsentId2').checked ? 'Yes' : 'No';
  let consent3 = document.getElementById('ConsentId3').checked ? 'Yes' : 'No';
  let json_req = {
    appId: fetch_json.appId,
    userId: fetch_json.userId,
    consentId: fetch_json.consentId,
    consentDtlId: fetch_json.consentDtlId,
    userFullName: fetch_json.userId,
    consentIds: '1,2,3',
    consentSignature: '',
    approveReject: consent1 + ',' + consent2 + ',' + consent3,
  };
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      console.log('success');
      const resp = JSON.parse(xhr.response);
      // replace a register form here
      console.log(resp);
    } else {
      const resp = JSON.parse(xhr.response);
      console.log(resp);
    }
  };
  xhr.open('POST', req_url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('tenant', 'TSpace');
  xhr.setRequestHeader('location', 'LineOA Zeatunaessence');
  xhr.setRequestHeader('contact', fetch_json.userId);
  xhr.setRequestHeader('sender', 'Thaibev-it');
  xhr.setRequestHeader('signature', tk);
  xhr.setRequestHeader('SecretKey', '1TTh@ib3v');
  xhr.send(JSON.stringify(json_req));
}
