const url = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1';

fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const spots = [];
        const spotData = data.data.results;
        console.log(spotData);
        spotData.forEach(element => {
            let tempArr = element["filelist"].split("http");
            let imageUrl = "http" + tempArr[1];
            spots.push([element["stitle"], imageUrl]);
        });

        let smallSpot = spots.slice(0, 3);
        let bigSpot = spots.slice(3, -1);


        var secondSection = document.getElementById("second-section");
        var smallSection = document.getElementById("small");
        var bigSection = document.getElementById("big");
        let width = window.innerWidth;

        for (let i = 0; i < 3; i++) {
            var node = document.createElement("div");
            var image = document.createElement("img");
            var spotName = document.createElement("p");

            image.src = smallSpot[i][1];
            spotName.innerText = smallSpot[i][0];

            node.className = "small-box";
            node.id = "promotion" + (Number(i) + 1);

            
            node.appendChild(image);
            node.appendChild(spotName);
            smallSection.appendChild(node);

        }


        let indexEnd = 10;

        for (let i = 0; i < indexEnd; i++) {
            var node = document.createElement("div");
            var image = document.createElement("img");
            var nameBox = document.createElement("div");
            var spotName = document.createElement("p");

            const number = (i % 10) + 1

            spotName.innerText = bigSpot[i][0];
            nameBox.className = "text-block";
            image.src = bigSpot[i][1];
            node.classList.add("big-box");
            nameBox.appendChild(spotName);
            node.appendChild(image);
            node.appendChild(nameBox);
            bigSection.appendChild(node);



        }

        updateGrid()

        function showMore(startIndex, end) {

            for (let i = startIndex; i < end; i++) {
                var node = document.createElement("div");
                var image = document.createElement("img");
                var nameBox = document.createElement("div");
                var spotName = document.createElement("p");
                const number = (i % 10) + 1

                spotName.innerText = bigSpot[i][0];
                nameBox.className = "text-block";
                image.src = bigSpot[i][1];
                node.classList.add("big-box");
                nameBox.appendChild(spotName);
                node.appendChild(image);
                node.appendChild(nameBox);
                bigSection.appendChild(node);

            }
        }

        function updateGrid() {
            const bigItems = bigSection.children.length;
            console.log(bigItems);
            const allSpots = document.querySelectorAll(".big-box");

            let columns, rows;
            width = window.innerWidth;
            if (width > 1200) {
                columns = 6;
                rows = Math.ceil(bigItems / 5);
                bigSection.style.gridTemplateRows = `repeat(${rows},1fr)`;
                bigSection.style.gridTemplateColumns = `repeat(${columns},1fr)`;
                console.log(`windowWidth:${width} - 1`);


                for (let i = 0; i < indexEnd; i++) {
                    let row = Math.ceil((i + 1) / (columns - 1));
                    if ((i + 1) % 5 === 1 ) {
                        allSpots[i].style.gridColumn = `1 /span 2`;
                        allSpots[i].style.gridRow = `${row}/ ${row + 1}`;
                    }
                    else {
                        allSpots[i].style.gridColumn = ` span 1`;
                        allSpots[i].style.gridRow = `${row}/ ${row + 1}`;
                    }
                    
                }
            } else if (600 < width <= 1200) {
                columns = 4;
                rows = Math.ceil(bigItems / columns);
                bigSection.style.gridTemplateRows = `repeat(${rows},1 fr)`;
                bigSection.style.gridTemplateColumns = `repeat(${columns},1fr)`;
                console.log(`windowWidth:${width} - 2`);
                for (let i = 0; i < indexEnd; i++) {
                    let row = Math.ceil((i + 1) / columns);
                    allSpots[i].style.gridColumn = "span 1";
                    allSpots[i].style.gridRow = `${row}/ ${row + 1}`;


                    if (bigItems % 4 !== 0) {
                        allSpots[bigItems - 1].style.gridColumn = "1/span 2";
                        allSpots[bigItems - 2].style.gridColumn = "3/span 2";
                    }
                    else {
                        allSpots[bigItems - 1].style.gridColumn = "span 1";
                        allSpots[bigItems - 2].style.gridColumn = "span 1";
                    }
                }
            } else if (width <= 600) {
                columns = 1;
                rows = Math.ceil(bigItems / columns);
                bigSection.style.gridTemplateRows = `repeat(${rows},1fr)`;
                for (let i = 0; i < indexEnd; i++) {
                    let row = Math.ceil((i + 1) / (columns - 1));
                    allSpots[i].style.gridColumns = 1;
                    allSpots[i].style.gridRows = `${row}/ ${row + 1}`;
                }
            }
        }



        var burgerButton = document.querySelector(".nav-button");
        var closeButton = document.querySelector(".close-nav");
        var menu = document.querySelector(".menu");
        var word = document.querySelector("#first-section");
        var loadButton = document.querySelector("#load-button");


        burgerButton.addEventListener('click', function () {
            menu.classList.add("is-active");
            closeButton.classList.add("is-active");
        })


        closeButton.addEventListener('click', function () {
            menu.classList.remove("is-active");
            closeButton.classList.remove("is-active");
        })

        loadButton.addEventListener("click", function () {
            let remainData = spots.length - indexEnd;
            if (remainData >= 0 && remainData <= 10) {
                let startIndex = indexEnd;
                indexEnd = remainData;
                showMore(startIndex, indexEnd);
                loadButton.innerText = "資料到底";
                loadButton.disabled = true;
                updateGrid();
            }

            else if (remainData >= 10) {
                let startIndex = indexEnd;
                indexEnd += 10;
                showMore(startIndex, indexEnd);
                updateGrid();
            }

        });

        window.addEventListener('resize',function(){
            updateGrid();
        });
    })
    .catch(error => {
        console.log(error);
    })
