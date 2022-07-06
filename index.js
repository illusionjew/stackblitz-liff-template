// Import stylesheets
import './style.css';
// Import LIFF
import liff from '@line/liff';

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
// const html_body = document.getElementById('Body');
// const profile_url = document.getElementById('UserProfilePictureURL');
// const display_name = document.getElementById('DisplayName');
// const status_msg = document.getElementById('LineStatus');
// const user_email = document.getElementById('UserEmail');
const birth_date_selector = document.getElementById('BirthDateSelector');
const birth_month_selector = document.getElementById('BirthMonthSelector');
const birth_year_selector = document.getElementById('BirthYearSelector');

async function main() {
  initialBirthSelector();
  // getUserProfile();
  await liff.init({
    liffId: '1657263880-bNJ3z7yx',
    // withLoginOnExternalBrowser: true,
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
    birth_year_selector.appendChild(option);
  }

  for (let j = 1; j < 13; j++) {
    var option = document.createElement('option');
    option.text = month_dict[j];
    option.value = j;
    birth_month_selector.appendChild(option);
  }

  for (let k = 1; k < 32; k++) {
    var option = document.createElement('option');
    option.text = k;
    option.value = k;
    birth_date_selector.appendChild(option);
  }
}
