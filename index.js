// Import stylesheets
import './style.css';

// Import LIFF
import liff from '@line/liff';

// Import jquery
import $ from 'jquery';

import boundary_data from './assets/province.json';
import app_config from './assets/app_config.json';

const province_array = boundary_data.Province;
const district_array = boundary_data.District;
const subdistrict_array = boundary_data.Subdistrict;

const form_body_html =
  '<div class="form-title">ลงทะเบียนสมัครสมาชิก</div><div class="form-subtitle">กรุณากรอกข้อมูลในช่องที่มี * ทุกช่อง</div><form id="CampaignRegistration"class="form-body needs-validation" novalidate><div class="mb-2"><label class="form-label">คำนำหน้าชื่อ *</label><select id="PrefixSelector" class="form-select form-select-sm" ><option selected>เลือกคำนำหน้าชื่อ</option><option value="นาย">นาย</option><option value="นางสาว">นางสาว</option><option value="นาง">นาง</option><option value="อื่น ๆ">อื่น ๆ</option></select><div class="invalid-feedback">กรุณาเลือกคำนำหน้าชื่อ</div></div><div id="PrefixnameDiv" class="mb-2"><label class="form-label">โปรดระบุ</label><input id="PrefixInput" type="text" class="form-control form-control-sm" /></div><div class="mb-2"><label class="form-label">ชื่อ *</label><input id="FirstnameInput" type="text" class="form-control form-control-sm" /><div class="invalid-feedback">กรุณากรอกชื่อ</div></div><div class="mb-2"><label class="form-label">นามสกุล *</label><input id="SurnameInput" type="text" class="form-control form-control-sm" /><div class="invalid-feedback">กรุณากรอกนามสกุล</div></div><div class="mb-2"><label class="form-label">ชื่อเล่น *</label><input id="NicknameInput" type="text" class="form-control form-control-sm" /></div><div class="mb-2"><label class="form-label">เพศ</label><div id="GenderSelector" class="form-control form-control-sm gender-radio"><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="genderOptions" id="inlineRadio1" value="Male" checked /><label class="form-check-label" for="inlineRadio1">ชาย</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="genderOptions" id="inlineRadio2" value="Female" /><label class="form-check-label" for="inlineRadio2">หญิง</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="genderOptions" id="inlineRadio3" value="Other" /><label class="form-check-label" for="inlineRadio3">ไม่ระบุ</label></div></div><div class="invalid-feedback">กรุณาเลือกเพศ</div></div><div class="mb-2"><label class="form-label">วันเดือนปีเกิด *</label><div class="input-group"><select class="form-select form-select-sm" id="BirthDateSelector"><option selected>dd</option></select><select class="form-select form-select-sm" id="BirthMonthSelector"><option selected>mm</option></select><select class="form-select form-select-sm" id="BirthYearSelector"><option selected>yyyy</option></select></div><div class="invalid-feedback">กรุณาระบุวันเกิด</div></div><div class="mb-2"><label class="form-label" style="width: 90% !important;">เบอร์โทร (10 หลัก) *</label><input id="PhoneInput" type="tel" class="form-control form-control-sm" maxlength=10 /><div class="invalid-feedback">กรุณากรอกเบอร์โทร</div></div><div class="mb-2"><label class="form-label">email</label><input id="EmailInput" type="email" class="form-control form-control-sm" /></div><div class="mb-2"><label class="form-label">ที่อยู่ *</label><textarea id="AddressInput" class="form-control form-control-sm" rows="2"></textarea><div class="invalid-feedback">กรุณากรอกที่อยู่</div></div><div class="mb-2"><label class="form-label">จังหวัด *</label><select id="ProvinceSelector" class="form-select form-select-sm"><option selected>เลือกจังหวัด</option></select><div class="invalid-feedback">กรุณาเลือกจังหวัด</div></div><div class="mb-2"><label class="form-label">อำเภอ/เขต *</label><select id="DistrictSelector" class="form-select form-select-sm"><option selected>เลือกอำเภอ/เขต</option></select><div class="invalid-feedback">กรุณาเลือกอำเภอ/เขต</div></div><div class="mb-2"><label class="form-label">ตำบล/แขวง *</label><select id="SubdistrictSelector" class="form-select form-select-sm"><option selected>เลือกตำบล/แขวง</option></select><div class="invalid-feedback">กรุณาเลือกตำบล/แขวง</div></div><div class="mb-2"><label class="form-label">รหัสไปรษณีย์ *</label><input id="PostcodeInput" type="tel" class="form-control form-control-sm" maxlength=5 /><div class="invalid-feedback">กรุณากรอกรหัสไปรษณีย์</div></div><div class="mb-2"><button id="SubmitForm" class="btn form-control btn-registration" type="button">ลงทะเบียน</button></div></form>';

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

async function main() {
  await liff.init({
    liffId: app_config.LineConf.LiffId,
    withLoginOnExternalBrowser: true,
  });
  if (liff.isLoggedIn()) {
    // getUserProfile();
    if (liff.isInClient()) {
      getUserProfile();
    } else {
      const div_content = document.getElementById('content-body');
      div_content.innerHTML =
        '<h1 class="AlreadyRegister"><br /><br /><br /><br /><br />' +
        '<br /><br /><br /><br />กรุณาเปิด Link ด้วย Line Application</h1>';
    }
  } else {
    liff.login({ redirectUri: app_config.LineConf.RedirectUri });
  }
}
main();

async function getUserProfile() {
  const user_profile = await liff.getProfile();
  // user_profile.pictureUrl;
  // user_profile.displayName;
  // user_profile.statusMessage;

  fetchConsent(user_profile.userId);
  // fetchConsent('mockuserid16'); // change before test full journey
  // foundRegistration('mockuserid16'); // test register
}

function filterDistrict() {
  let prov_sel = document.getElementById('ProvinceSelector').value;
  const dist_selector = document.getElementById('DistrictSelector');
  dist_selector.innerHTML = '<option selected>เลือกอำเภอ/เขต</option>';
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
  subd_selector.innerHTML = '<option selected>เลือกตำบล/แขวง</option>';
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
  const birth_date_selector = document.getElementById('BirthDateSelector');
  const birth_month_selector = document.getElementById('BirthMonthSelector');
  const birth_year_selector = document.getElementById('BirthYearSelector');
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
  const province_selector = document.getElementById('ProvinceSelector');
  const district_selector = document.getElementById('DistrictData');
  const subdistrict_selector = document.getElementById('SubdistrictData');
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
  let tenant = app_config.Consent.Tenant;
  let location = app_config.Consent.Location;
  let t = new Date();
  let date = ('0' + t.getDate()).slice(-2);
  let month = ('0' + (t.getMonth() + 1)).slice(-2);
  let year = t.getFullYear();
  let body = `${location}${contact}${tenant}${year}${month}${date}`;
  let hash = crypto
    .createHmac('SHA256', app_config.Consent.EncryptKey)
    .update(body)
    .digest('base64');
  return hash;
}

function submitForm(cid) {
  let req_url = app_config.Service.BaseURL + '/customer/save';
  let prefix_sel = document.getElementById('PrefixSelector').value;
  if (prefix_sel == 'อื่น ๆ') {
    prefix_sel = document.getElementById('PrefixInput').value;
  }

  let firstname_val = document.getElementById('FirstnameInput').value;
  let surname_val = document.getElementById('SurnameInput').value;
  let nickname_val = document.getElementById('NicknameInput').value;
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
    nickname_val != '' &&
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
    if (phone_val.length != 10) {
      alert('กรุณากรอกเบอร์โทรให้ครบ 10 หลัก');
    } else {
      let json_data = {
        line_id: cid,
        title: prefix_sel,
        first_name: firstname_val,
        last_name: surname_val,
        nick_name: nickname_val,
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

      $.ajax({
        type: 'POST',
        url: req_url,
        dataType: 'json',
        data: json_data,
        success: function (response) {
          // alert('ขอบคุณที่ลงทะเบียนเข้าร่วมกิจกรรมกับเรา');
          // liff.closeWindow();
          document.getElementById('content-body').innerHTML =
            '<h1 class="AlreadyRegister">' +
            '<img class="thank-you-image" src="https://raw.githubusercontent.com/illusionjew/stackblitz-liff-template/main/assets/images/Check-Icon.png" />' +
            '<br /><br /><b>ลงทะเบียนสำเร็จ</b><br />ขอบคุณที่ลงทะเบียนเข้าร่วมกิจกรรม<br />ZEA Tuna Essence</h1>';
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  } else {
    alert('กรุณากรอกข้อมูลในช่องที่มีเครื่องหมาย * ให้ครบถ้วน');
  }
}

function fetchConsent(cid) {
  let tk = genTK(cid);
  let req_url = app_config.Consent.BaseURL + '/v1/Content/GetConsentByApp';
  let json_req = {
    appCode: app_config.Consent.AppCode,
    userId: cid,
    lang: 'th',
    isRegister: 'true',
    consentType: 'A',
  };
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      const resp = JSON.parse(xhr.response);
      const div_content = document.getElementById('content-body');
      if (resp.appId == null) {
        // user already save consent
        // verify that user registration
        foundRegistration(cid);
      } else {
        div_content.innerHTML =
          '<div class="container-md form-container"><div class="modal show-modal" tabindex="-1"><div class="modal-dialog modal-dialog-scrollable"><div class="modal-content" style="height: 90%"><div class="modal-body">' +
          resp.content +
          '<br><table class="table-consent"><tbody id="TableBodyConsent"></tbody></table></div><div id="FooterConsent" class="modal-footer modal-footer-style"></div></div></div></div>';

        // for loop consent item append to table
        resp.consentList.forEach((item) => {
          let confm = document.getElementById('TableBodyConsent');
          if (item.consentListId == '1' || item.consentListId == 1) {
            let tag =
              '<tr><td>' +
              // item.description +
              ' ข้าพเจ้าได้อ่านและรับทราบ ข้อกำหนดและเงื่อนไขการใช้งาน และ ประกาศคุ้มครองข้อมูลส่วนบุคคล' +
              '</td><td><label class="switch"><input type="checkbox" id="ConsentId' +
              item.consentListId +
              '" name="ConsentId' +
              item.consentListId +
              '" value="ConsentId' +
              item.consentListId +
              '" checked /><span class="slider round"></span></label></td></tr><tr><td></td></tr>';
            confm.innerHTML = confm.innerHTML + tag;
          } else {
            let tag =
              '<tr><td>' +
              item.description +
              '</td><td><label class="switch"><input type="checkbox" id="ConsentId' +
              item.consentListId +
              '" name="ConsentId' +
              item.consentListId +
              '" value="ConsentId' +
              item.consentListId +
              '" /><span class="slider round"></span></label></td></tr><tr><td></td></tr>';
            confm.innerHTML = confm.innerHTML + tag;
          }
        });

        // add innerHTML to FooterConsent
        let ft = document.getElementById('FooterConsent');
        ft.innerHTML =
          '<div class="consentBtn"><button type="button" id="BtnRejectConsent">' +
          // resp.cancelText +
          'ปฏิเสธ' +
          '</button></div><div class="consentBtn"><button type="button" id="BtnSaveConsent">' +
          // resp.submitText +
          'ยอมรับ' +
          '</button></div>';

        // add listener funtion to each button
        document.getElementById('ConsentId1').onclick = () => {
          enableSaveConsentBtn();
        };
        // document.getElementById('ConsentId2').onclick = () => {
        //   enableSaveConsentBtn();
        // };
        // document.getElementById('ConsentId3').onclick = () => {
        //   enableSaveConsentBtn();
        // };
        document.getElementById('BtnRejectConsent').onclick = () => {
          liff.closeWindow();
        };
        document.getElementById('BtnSaveConsent').onclick = () => {
          saveConsent(resp, tk);
        };
      }
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

function enableSaveConsentBtn() {
  const chk1 = document.getElementById('ConsentId1');
  // const chk2 = document.getElementById('ConsentId2');
  // const chk3 = document.getElementById('ConsentId3');
  // if (chk1.checked && chk2.checked && chk3.checked) {
  if (chk1.checked) {
    document.getElementById('BtnSaveConsent').disabled = false;
  } else {
    document.getElementById('BtnSaveConsent').disabled = true;
  }
}

function saveConsent(fetch_json, tk) {
  let req_url = app_config.Consent.BaseURL + '/v1/Content/SaveConsentByUser';
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
      initialRegistrationForm(fetch_json.userId);
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

function initialRegistrationForm(cid) {
  const div_content = document.getElementById('content-body');
  div_content.innerHTML = form_body_html;
  initialBirthSelector();
  initialBoundarySelector();

  document.getElementById('PrefixSelector').onchange = () => {
    togglePrefixInput();
  };
  document.getElementById('BirthMonthSelector').onchange = () => {
    dateFilterByMonth();
  };
  document.getElementById('BirthYearSelector').onchange = () => {
    dateFilterByMonth();
  };
  document.getElementById('ProvinceSelector').onchange = () => {
    filterDistrict();
  };
  document.getElementById('DistrictSelector').onchange = () => {
    filterSubdistrict();
  };
  document.getElementById('SubmitForm').onclick = () => {
    submitForm(cid);
  };
}

function foundRegistration(cid) {
  let req_url = app_config.Service.BaseURL + '/customer/get/' + cid;
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      document.getElementById('content-body').innerHTML =
        '<h1 class="AlreadyRegister">' +
        '<img class="thank-you-image" src="https://raw.githubusercontent.com/illusionjew/stackblitz-liff-template/main/assets/images/Check-Icon.png" />' +
        '<br /><br />คุณได้ลงทะเบียนเข้าร่วมกิจกรรม<br />เป็นที่เรียบร้อยแล้ว</h1>';
    } else {
      initialRegistrationForm(cid);
    }
  };
  xhr.open('GET', req_url, true);
  xhr.send();
}
