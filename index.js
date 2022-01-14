
const dropArea = document.querySelector('#profile-photo');
const initFunction = () => {


    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(element => {
        dropArea.addEventListener(element, (e) => {
            e.preventDefault();
        })
    });

    ['dragenter', 'dragover'].forEach(element => {
        dropArea.addEventListener(element, () => {
            dropArea.classList.add('drag-active');
        })
    });
    ['dragleave', 'drop'].forEach(element => {
        dropArea.addEventListener(element, () => {
            dropArea.classList.remove('drag-active');
        })
    })

    dropArea.addEventListener('drop', handleDrop);
}
const handleDrop = (e) => {
    const dt = e.dataTransfer;
    let image = dt.files[0];

    if (image.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(image);
        reader.onload = () => {
            dropArea.style.backgroundImage = `url('${reader.result}')`;
            dropArea.style.border = 'none';
        }

        document.getElementById('profile-photo-text').style.display = 'none';
    }
}

const photoClickHandle = () => {
    const fileSelector = document.getElementById('profile-photo-input');

    dropArea.addEventListener('click', fileSelector.click())
    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;
        let image = fileList[0];

        if (image.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.readAsDataURL(image);
            reader.onload = () => {
                dropArea.style.backgroundImage = `url('${reader.result}')`;
                dropArea.style.border = 'none';
            }

            document.getElementById('profile-photo-text').style.display = 'none';
        }
    });
}

const validateInput = (e) => {
    let input = e.target;
    let pattern = new RegExp(input.pattern.slice(1, -1))
    console.log(pattern);
    if(!input.value.match(pattern)) {
        input.style.border = '1px solid red';
    } else  input.style.border = "none";
}

const addField = (e) => {
    const field = document.createElement('div');
    field.className = 'info-field'
    const fieldHeader = document.createElement('input');
    fieldHeader.className = 'info-field-header'
    const fieldContent = document.createElement('textarea');
    fieldContent.className = 'info-field-content'

    field.append(fieldHeader, fieldContent)
    e.target.parentNode.insertBefore(field, e.target);
}

const addInfoBlock = () => {

    const parent = document.getElementById('add-button');

    const infoBlock = document.createElement('div');
    infoBlock.className = 'info-block'
    const header = document.createElement('input');
    header.className = 'info-header'
    const field = document.createElement('div');
    field.className = 'info-field'
    const fieldHeader = document.createElement('input');
    fieldHeader.className = 'info-field-header'
    const fieldContent = document.createElement('textarea');
    fieldContent.className = 'info-field-content'
    const addButton = document.createElement('div');
    addButton.className = 'add-field-button';
    addButton.innerHTML = "add";

    
    
    field.append(fieldHeader, fieldContent)
    infoBlock.append(header, field, addButton)
    parent.parentNode.insertBefore(infoBlock, parent);

    let buttonsArray = document.getElementsByClassName('add-field-button');
    console.log(buttonsArray);
    [...buttonsArray].forEach(e=>{
        e.addEventListener("click", addField);
    })
}

document.getElementById('mail').addEventListener('change', validateInput);
document.getElementById('phone').addEventListener('change', validateInput);
document.getElementById('fio').addEventListener('change', validateInput);

document.getElementById('add-button').addEventListener('click', addInfoBlock)


document.addEventListener('DOMContentLoaded', initFunction());

