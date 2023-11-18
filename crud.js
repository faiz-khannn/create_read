let data = [];
let t = document.getElementById("t1");
let s_mode = "s";
let edit_row = null;
let edit_id = null;

function create_table() {
  let ihtml = "";
  for (i = 0; i < data.length; i++) {
    ihtml += `<tr><td>${data[i]["sn"]}</td>
    <td>${data[i]["firstName"]}</td>
    <td>${data[i]["lastName"]}</td>
    <td>${data[i]["emailid"]}</td>
    <td>${data[i]["password"]}</td>
    <td><button onclick=del(parentElement.parentElement)>Delete</button></td>
    <td><button onclick=edit(parentElement.parentElement)>Edit</button></td> </tr>`;
  }

  let tb = document.getElementById("t1");
  tb.innerHTML = ihtml;
}

function uniqueIDcheck(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i]["sn"] == id) {
      return false;
    }
  }
  return true;
}

function allValueNotFilled() {
  if (
    document.getElementById("sn").value == "" ||
    document.getElementById("f_name").value == "" ||
    document.getElementById("l_name").value == "" ||
    document.getElementById("e_mail").value == "" ||
    document.getElementById("pword").value == ""
  ) {
    return true;
  } else {
    return false;
  }
}

function Submit() {
  if (s_mode == "s") {
    if (allValueNotFilled()) {
      alert("Please fill all fields!");
    } else {
      let sn = document.getElementById("sn").value;

      if (uniqueIDcheck(sn)) {
        let sn = document.getElementById("sn").value;
        let fName = document.getElementById("f_name").value;
        let lName = document.getElementById("l_name").value;
        let eMail = document.getElementById("e_mail").value;
        let pass = document.getElementById("pword").value;

        da = {
          sn: sn,
          firstName: fName,
          lastName: lName,
          emailid: eMail,
          password: pass,
        };

        data.push(da);
        data.sort((a, b) => a.sn - b.sn);
        create_table();
      } else {
        alert("ID already exists. Please enter a unique ID.");
      }
    }
  } else if (s_mode == "e") {
    if (allValueNotFilled()) {
      alert("Please fill all fields!");
    } else {
      if (edit_id == document.getElementById("sn").value) {
        data[edit_row]["firstName"] = document.getElementById("f_name").value;
        data[edit_row]["lastName"] = document.getElementById("l_name").value;
        data[edit_row]["emailid"] = document.getElementById("e_mail").value;
        data[edit_row]["password"] = document.getElementById("pword").value;
        data.sort((a, b) => a.sn - b.sn);
        create_table();
      } else {
        alert("ID cannot be changed!");
      }
    }
  }
  s_mode = "s";
  document.getElementById("sn").value = "";
  document.getElementById("f_name").value = "";
  document.getElementById("l_name").value = "";
  document.getElementById("e_mail").value = "";
  document.getElementById("pword").value = "";
}

function del(r) {
  r_cont = r.textContent;
  s = r_cont.split("\n");

  for (i = 0; i < data.length; i++) {
    if (data[i]["sn"] == s[0]) {
      data.splice(i, 1);
    }
  }
  data.sort((a, b) => a.sn - b.sn);
  create_table();
}

function edit(r) {
  r_cont = r.textContent;
  s = r_cont.split("\n");
  for (i = 0; i < data.length; i++) {
    if (data[i]["sn"] == s[0]) {
      edit_row = i;
      s_mode = "e";
      edit_id = data[edit_row]["sn"];
      document.getElementById("sn").value = data[edit_row]["sn"];
      document.getElementById("f_name").value = data[edit_row]["firstName"];
      document.getElementById("l_name").value = data[edit_row]["lastName"];
      document.getElementById("e_mail").value = data[edit_row]["emailid"];
      document.getElementById("pword").value = data[edit_row]["password"];
    }
  }
}

function Search() {
  console.log("in search");
  let srch_key = document.getElementById("search").value;
  let srch_found = 0;
  let ihtml = "";
  for (i = 0; i < data.length; i++) {
    console.log("in loop");
    if (
      data[i]["sn"] == srch_key ||
      data[i]["firstName"] == srch_key ||
      data[i]["lastName"] == srch_key ||
      data[i]["emailid"] == srch_key ||
      data[i]["password"] == srch_key
    ) {
      srch_found++;
      ihtml += `<tr><td>${data[i]["sn"]}</td>
    <td>${data[i]["firstName"]}</td>
    <td>${data[i]["lastName"]}</td>
    <td>${data[i]["emailid"]}</td>
    <td>${data[i]["password"]}</td>
    <td><button onclick=del(parentElement.parentElement)>Delete</button></td>
    <td><button onclick=edit(parentElement.parentElement)>Edit</button></td> </tr>`;
    }

    let tb = document.getElementById("t1");
    tb.innerHTML = ihtml;
  }
  if (srch_found == 0) {
    alert("No search result found!");
  }
}
