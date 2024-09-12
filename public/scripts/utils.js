function showFolderEditDialog(id, folderName) {
  const dialog = document.getElementById("editFolderDialog");
  dialog.querySelector("form").action = `/folders/${id}/edit-folder`;
  dialog.querySelector('input[name="new_folder_name"]').value = folderName;
  dialog.showModal();
}

function showFileEditDialog(id, fileName) {
  const dialog = document.getElementById("editFileDialog");
  dialog.querySelector("form").action = `/files/${id}/edit-file`;
  dialog.querySelector('input[name="new_file_name"]').value = fileName;
  dialog.showModal();
}

function showOptions(id) {
  document.getElementById(`folder-option-${id}`).show();
}

// Close options dialog when clicking outside
document.addEventListener("click", function (event) {
  document.querySelectorAll("dialog.folder-option").forEach((dialog) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;
    const isIconClick = event.target.closest(".cursor-pointer");

    if (!isInDialog && !isIconClick) {
      dialog.close();
    }
  });
});

// Select all modal dialog elements
const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {
  dialog.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();

    // Check if the click is outside the dialog
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      console.log("Dialog closed due to outside click");
      dialog.close();
    }
  });
});
