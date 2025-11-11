const fileInput = document.querySelector('.file-input');
const chooseImgBtn = document.querySelector('.choose-img');
const previewImg = document.querySelector('.preview-image img');
const filterSlider = document.querySelectorAll('.slider-container input');
const filterValue = document.querySelectorAll('.filter-info .value');
const resetFilterBtn = document.querySelector('.reset-btn');
const saveImgBtn = document.querySelector('.save-img');

chooseImgBtn.addEventListener('click', () => {
    fileInput.click();
});


fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load', () => {
        document.querySelector('.editor-container').classList.remove('disable');
    });
});

    
filterSlider.forEach((slider, index) => {
    slider.addEventListener("input", function() {
        filterValue[index].innerText = this.value + '%';
        applyFilters();
    });
});
function applyFilters() {
    brightness = filterSlider[0].value;
    saturation = filterSlider[1].value;
    inversion = filterSlider[2].value;
    contrast = filterSlider[3].value;
    grayscale = filterSlider[4].value;
    sepia = filterSlider[5].value;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%)`;
}


resetFilterBtn.addEventListener('click', () => {
    filterSlider[0].value = 100;
    filterSlider[1].value = 100;
    filterSlider[2].value = 0;
    filterSlider[3].value = 100;
    filterSlider[4].value = 0;
    filterSlider[5].value = 0;
    filterValue[0].innerText = '100%';
    filterValue[1].innerText = '100%';
    filterValue[2].innerText = '0%';
    filterValue[3].innerText = '100%';
    filterValue[4].innerText = '0%';
    filterValue[5].innerText = '0%';
    applyFilters();
});

saveImgBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%)`;
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
});