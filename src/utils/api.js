const API_URL =
  "https://script.google.com/macros/s/AKfycbzh8uFUijj97C8gnLnW82NoxcnpQ4_CtFuC2j9J3JaRCz1B9F-1-pgppV1IDSUFwSqj/exec"

//
// GET APPLICATIONS
//
export async function getApplications(user_id) {

  try {

    const response = await fetch(
      `${API_URL}?action=getApplications&user_id=${user_id}`
    )

    return await response.json()

  } catch (error) {

    console.log(
      "GET APPLICATION ERROR:",
      error
    )

    return {
      success: false,
      data: [],
    }
  }
}

//
// ADD APPLICATION
//
export async function addApplication(data) {

  try {

    const formData =
      new URLSearchParams()

    formData.append(
      "action",
      "addApplication"
    )

    formData.append(
      "app_id",
      data.app_id || ""
    )

    formData.append(
      "user_id",
      data.user_id || ""
    )

    formData.append(
      "nama_pt",
      data.nama_pt || ""
    )

    formData.append(
      "posisi",
      data.posisi || ""
    )

    formData.append(
      "job_deskripsi",
      data.job_deskripsi || ""
    )

    formData.append(
      "tanggal_apply",
      data.tanggal_apply || ""
    )

    formData.append(
      "link_apply",
      data.link_apply || ""
    )

    formData.append(
      "catatan",
      data.catatan || ""
    )

    formData.append(
      "status",
      data.status || "Melamar"
    )

    const response = await fetch(
      API_URL,
      {

        method: "POST",

        body: formData,
      }
    )

    return await response.json()

  } catch (error) {

    console.log(
      "ADD APPLICATION ERROR:",
      error
    )

    return {
      success: false,
    }
  }
}

//
// DELETE APPLICATION
//
export async function deleteApplication(
  app_id
) {

  try {

    const formData =
      new URLSearchParams()

    formData.append(
      "action",
      "deleteApplication"
    )

    formData.append(
      "app_id",
      app_id
    )

    const response = await fetch(
      API_URL,
      {

        method: "POST",

        body: formData,
      }
    )

    return await response.json()

  } catch (error) {

    console.log(
      "DELETE ERROR:",
      error
    )

    return {
      success: false,
    }
  }
}

//
// UPDATE STATUS
//
export async function updateStatus(
  app_id,
  status
) {

  try {

    const formData =
      new URLSearchParams()

    formData.append(
      "action",
      "updateStatus"
    )

    formData.append(
      "app_id",
      app_id
    )

    formData.append(
      "status",
      status
    )

    const response = await fetch(
      API_URL,
      {

        method: "POST",

        body: formData,
      }
    )

    return await response.json()

  } catch (error) {

    console.log(
      "UPDATE STATUS ERROR:",
      error
    )

    return {
      success: false,
    }
  }
}

//
// AUTO REJECT
//
export async function autoReject(
  user_id
) {

  try {

    const formData =
      new URLSearchParams()

    formData.append(
      "action",
      "autoReject"
    )

    formData.append(
      "user_id",
      user_id
    )

    const response = await fetch(
      API_URL,
      {

        method: "POST",

        body: formData,
      }
    )

    return await response.json()

  } catch (error) {

    console.log(
      "AUTO REJECT ERROR:",
      error
    )

    return {
      success: false,
    }
  }
}