let score = 10;

function showScore()
{
    document.getElementById("points").innerHTML = score;
    if(score>5)
    {
        var img = document.createElement("img");
        img.src ="https://media.giphy.com/media/i0f2SCKCv7AsM/giphy.gif";
        document.getElementById("gif").appendChild(img);
    }

    else if(score<5)
    {
        var img = document.createElement("img");
        img.src ="https://i.gifer.com/JES.gif";
        document.getElementById("gif").appendChild(img);
    }
}
