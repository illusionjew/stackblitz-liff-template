// Import stylesheets
import './style.css';
// Import LIFF
import liff from '@line/liff';

// get html element
// const html_body = document.getElementById('Body');
// const profile_url = document.getElementById('UserProfilePictureURL');
// const display_name = document.getElementById('DisplayName');
// const status_msg = document.getElementById('LineStatus');
// const user_email = document.getElementById('UserEmail');
const prefix_div = document.getElementsByClassName('prefixname-input');

async function main() {
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
