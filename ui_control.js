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
