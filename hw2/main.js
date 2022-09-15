const anchoredFunc = document.getElementById("anchored-func");
let boxs = document.getElementsByClassName("box");
let amount = boxs.length
let anchored = 1;

for (let i = 0; i < amount; i++)
{
    (function (target)
    {
        addFunction(target)
    })(boxs[i])
}

function addFunction(target)
{
    let closeBtn = target.childNodes[7];
    let anchorBtn = target.childNodes[9];
    let personAvatar = target.childNodes[3];
    let personName = target.childNodes[1];
    let anchoredAvatar = document.querySelector(".anchored-avatar");
    let anchoredName = document.querySelector(".anchored-name");

    closeBtn.onclick = function ()
    {
        target.remove();
    };

    anchorBtn.onclick = function ()
    {
        if (anchored === 1)
        {
            copyLeftToRight();
            anchoredAvatar.src = personAvatar.src
            anchoredName.innerHTML = personName.innerHTML;
        }
        else
        {
            anchoredAvatar.src = personAvatar.src
            anchoredName.innerHTML = personName.innerHTML;
            let leftbox = document.getElementsByClassName("leftbox");
            leftbox[0].style.display = "flex";
            anchored = 1;
        }
        target.remove();
    }
}

function copyLeftToRight()
{
    const myDiv = boxs[0];
    let divClone = myDiv.cloneNode(true);
    let rightbox = document.getElementsByClassName("rightbox");
    rightbox[0].appendChild(divClone);

    let personAvatar = document.querySelectorAll(".person-avatar");
    personAvatar[personAvatar.length - 1].src = document.querySelector(".anchored-avatar").src;
    let personName = document.querySelectorAll(".person-name");
    personName[personName.length - 1].innerHTML = document.querySelector(".anchored-name").innerHTML;

    let target = boxs[boxs.length - 1];
    target.style.display = "flex";
    addFunction(target);
}

anchoredFunc.onclick = function ()
{
    copyLeftToRight();
    anchoredFunc.parentElement.parentElement.style.display = "none";
    anchored = 0;
}