const add = document.getElementById("add");
const anchoredFunc = document.getElementById("anchored-func");
let boxs = document.getElementsByClassName("box");
let amount = boxs.length
let anchored = 1;
let newAmount = 0
let avatarIndex = 0

const newPerson = [
    ["Gwen", "https://i.imgur.com/n5dEi5z.png"],
    ["Zed", "https://i.imgur.com/48E7QTr.png"],
    ["Lux", "https://i.imgur.com/VuFJgFy.png"],
    ["Lulu", "https://i.imgur.com/Fp3S586.png"],
    ["Darius", "https://i.imgur.com/84dJcuD.png"],
    ["Shen", "https://i.imgur.com/YKeUZcG.png"],
    ["Olaf", "https://i.imgur.com/5weCjr0.png"],
    ["Camille", "https://i.imgur.com/AwHoHjU.png"],
    ["Pyke", "https://i.imgur.com/IcvuycK.png"],
    ["Akali", "https://i.imgur.com/q0u2G6I.png"],
    ["Fizz", "https://i.imgur.com/b5aDkn3.png"],
    ["Fiora", "https://i.imgur.com/495fHL0.png"],
    ["Jinx", "https://i.imgur.com/HNZX5L7.png"],
    ["Vi", "https://i.imgur.com/EYZb0o3.png"],
    ["Yone", "https://i.imgur.com/NtG0fYz.png"]
]

function time()
{
    let t_div = document.getElementsByClassName("item1")[0];
    let now = new Date()
    t_div.innerHTML = now.getHours() + " : " + now.getMinutes() + " | Web Programming";
    setTimeout(time, 1000);
}

function addPeople()
{
    const myDiv = boxs[0];
    let divClone = myDiv.cloneNode(true);
    let rightbox = document.getElementsByClassName("rightbox");
    rightbox[0].appendChild(divClone);
    let target = boxs[boxs.length - 1];
    target.style.display = "flex";
    target.childNodes[1].innerHTML = newPerson[avatarIndex % 15][0];
    target.childNodes[3].src = newPerson[avatarIndex % 15][1];
    avatarIndex++;
    addFunction(target);
}

function copyLeftToRight()
{
    addPeople();
    let target = boxs[boxs.length - 1];
    target.childNodes[1].innerHTML = document.querySelector(".anchored-name").innerHTML;
    target.childNodes[3].src = document.querySelector(".anchored-avatar").src;
    let name = target.childNodes[1].innerHTML;
    if (name === "你")
    {
        target.childNodes[7].remove();
    }
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
        newAmount--;
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

anchoredFunc.onclick = function ()
{
    copyLeftToRight();
    anchoredFunc.parentElement.parentElement.style.display = "none";
    anchored = 0;
}

add.onclick = function ()
{
    if (newAmount < 9)
    {
        addPeople();
        newAmount++;
    }
}

for (let i = 0; i < amount; i++)
{
    (function (target)
    {
        addFunction(target)
    })(boxs[i])
}