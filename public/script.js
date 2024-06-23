const socket = io();

socket.on('statusUpdate', ({ studentId, status }) => {
    const toastContainer = document.getElementById('toastContainer');

    // Tampilkan toast menggunakan toastr.js
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 5000 // Durasi toast (ms)
    };

    toastr.success(`Status updated for Student ID ${studentId}: ${status}`);

    // Update daftar status di halaman
    const statusList = document.getElementById('statusList');
    let listItem = document.querySelector(`li[data-id="${studentId}"]`);
    if (!listItem) {
        listItem = document.createElement('li');
        listItem.setAttribute('data-id', studentId);
        statusList.appendChild(listItem);
    }
    listItem.textContent = `${studentId}: ${status}`;
});
