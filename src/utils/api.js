const API_URL =
  "https://script.google.com/macros/s/AKfycbzh8uFUijj97C8gnLnW82NoxcnpQ4_CtFuC2j9J3JaRCz1B9F-1-pgppV1IDSUFwSqj/exec"

async function postData(data) {

  try {

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    })

    return await response.json()

  } catch (error) {

    console.log(error)

    return {
      success: false,
      message: error.message,
    }
  }
}

// GET APPLICATIONS
export async function getApplications(user_id) {

  return await postData({
    action: "getApplications",
    user_id,
  })
}

// ADD APPLICATION
export async function addApplication(app) {

  return await postData({
    action: "addApplication",
    ...app,
  })
}

// DELETE APPLICATION
export async function deleteApplication(app_id) {

  return await postData({
    action: "deleteApplication",
    app_id,
  })
}

// UPDATE STATUS
export async function updateStatus(
  app_id,
  status
) {

  return await postData({
    action: "updateStatus",
    app_id,
    status,
  })
}