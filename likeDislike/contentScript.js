try {
    const filledDislikeSvg = '<svg id="SvgjsSvg1024" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1025"></defs><g id="SvgjsG1026"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" opacity=".87"></path><path d="M10.88 21.94l5.53-5.54c.37-.37.58-.88.58-1.41V5c0-1.1-.9-2-2-2H6c-.8 0-1.52.48-1.83 1.21L.91 11.82C.06 13.8 1.51 16 3.66 16h5.65l-.95 4.58c-.1.5.05 1.01.41 1.37.59.58 1.53.58 2.11-.01zM21 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#bb1717" class="color000 svgShape"></path></svg></g></svg>'
    const filledLikeSvg = '<svg id="SvgjsSvg1018" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1019"></defs><g id="SvgjsG1020"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" opacity=".87"></path><path d="M13.12 2.06L7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11.01zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z" fill="#2d6cdf" class="color000 svgShape"></path></svg></g></svg>'
    const emptyDislikeSvg = '<svg id="SvgjsSvg1001" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1002"></defs><g id="SvgjsG1008"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z" fill="#b70000" class="color000 svgShape"></path></svg></g></svg>';
    const emptyLikeSvg = '<svg id="SvgjsSvg1011" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1012"></defs><g id="SvgjsG1013"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z" fill="#2d6cdf" class="color000 svgShape"></path></svg></g></svg>';

    const questionTable = document.querySelector(".problems");
    let trs;
    if (questionTable) {
        const tableBody = questionTable.children;
        trs = tableBody[0].getElementsByTagName("tr");
        // bring data for 5 problems at a time
        let inc = 5;
        let start = 1, end = 1;
        let ct = 1;
        while (end < trs.length) {
            start = end;
            end = Math.min(inc * ct, trs.length);
            ct += 1;
            bringData(start, end);
        }
    }

    // function to bring the data (likes, dislikes of each problem) and also which are liked by user 
    function bringData(start, end) {
        let bringProblems = []
        // collect all problems
        for (let i = start; i < end; i++) {
            const allTds = trs[i].getElementsByTagName("td");
            const btnId = allTds[0].children[0].text.trim();
            bringProblems.push(btnId);
        }
        // get user handle
        const headerDiv = document.getElementsByClassName("lang-chooser");
        const loginCredentials = headerDiv[0].children[1];
        const userHandle = loginCredentials.children[0].textContent;
        const loginStatus = loginCredentials.children[1].textContent;

        const Id = "kkbcnfpdaldhcbmgnnldkgahkhhcbloj";
        const data = { bringProblems, userHandle, loginStatus, Id };
        fetch("https://whispering-cove-08403.herokuapp.com/", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then((data) => {
                // probData consist of likes, dislikes 
                // vis consist of problems which are reviewed by user
                const { probData, vis } = data;

                if (start === 1) {
                    const allThs = trs[0].getElementsByTagName("th");
                    const lastTh = allThs[allThs.length - 1];
                    lastTh.classList.remove("right");
                    const th1 = document.createElement("th");
                    const th2 = document.createElement("th");
                    th1.classList.add("top");
                    th2.classList.add("top", "right");
                    th1.innerHTML = filledLikeSvg;
                    th2.innerHTML = filledDislikeSvg;
                    trs[0].append(th1, th2);
                }

                function disableButtons(id, color, change) {
                    if (color === "L") {
                        const btn1 = document.getElementById(id + "L");
                        btn1.innerHTML = filledLikeSvg;
                        const sectionToUpdateL = btn1.nextElementSibling;
                        if (change) {
                            sectionToUpdateL.innerText = parseInt(sectionToUpdateL.innerText) + 1;
                        }
                        btn1.disabled = true;
                        const btn2 = document.getElementById(id + "D");
                        if (btn2.disabled) {
                            const sectionToUpdateD = btn2.nextElementSibling;
                            if (change) {
                                sectionToUpdateD.innerText = parseInt(sectionToUpdateD.innerText) - 1;
                            }
                            btn2.disabled = false;
                            btn2.innerHTML = emptyDislikeSvg;
                        }
                    }
                    else {
                        const btn2 = document.getElementById(id + "D");
                        btn2.innerHTML = filledDislikeSvg;
                        btn2.disabled = true;
                        const sectionToUpdateD = btn2.nextElementSibling;
                        if (change) {
                            sectionToUpdateD.innerText = parseInt(sectionToUpdateD.innerText) + 1;
                        }
                        const btn1 = document.getElementById(id + "L");
                        if (btn1.disabled) {
                            const sectionToUpdateL = btn1.nextElementSibling;
                            if (change) { sectionToUpdateL.innerText = parseInt(sectionToUpdateL.innerText) - 1; }
                            btn1.disabled = false;
                            btn1.innerHTML = emptyLikeSvg;
                        }
                    }
                }
                // function to make the changes per like, dislike button clicked and then disable them after
                function clicked() {
                    let id = this.id;
                    const value = id[id.length - 1];
                    id = id.slice(0, -1);
                    const dataTosend = { id, userHandle, value, Id };
                    fetch(`https://whispering-cove-08403.herokuapp.com/`, {
                        method: "PATCH",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTosend)
                    })
                        .then((response) => {
                            if (response.ok) {
                                return response;
                            }
                            return Promise.reject(response);
                        })
                        .then((data) => {

                        })
                        .catch((err) => {
                            console.log("error while updating the value", err);
                        })
                    disableButtons(id, value, true);
                }
                // insert all the data into the webpage 
                for (let i = start; i < end; i++) {
                    const allTds = trs[i].getElementsByTagName("td");
                    const lastTd = allTds[allTds.length - 1];
                    lastTd.classList.remove("right");
                    const currTr = trs[i];
                    const accepted = currTr.classList.contains("accepted-problem");
                    const td1 = document.createElement("td");
                    const td2 = document.createElement("td");
                    for (let cls of lastTd.classList) {
                        td1.classList.add(cls), td2.classList.add(cls);
                    }
                    td2.classList.add("right");
                    // create like, dislike button and a counter for both
                    const like = document.createElement("button");
                    const dislike = document.createElement("button");
                    const likeValue = document.createElement("section");
                    const dislikeValue = document.createElement("section");
                    like.innerHTML = emptyLikeSvg;
                    dislike.innerHTML = emptyDislikeSvg;
                    like.style.backgroundColor = "inherit";
                    like.style.border = "none";
                    dislike.style.backgroundColor = "inherit";
                    dislike.style.border = "none";
                    const btnId = allTds[0].children[0].text.trim();
                    likeValue.append(0);
                    dislikeValue.append(0);
                    like.id = btnId + 'L', dislike.id = btnId + 'D';
                    if ((loginStatus === "Logout" || loginStatus === "Выйти") && accepted) {
                        like.addEventListener("click", clicked);
                        dislike.addEventListener("click", clicked);
                    }
                    // do some styling
                    const t1Section = document.createElement("section");
                    t1Section.append(like, likeValue);
                    t1Section.style.display = "flex";
                    t1Section.style.alignItems = "center"
                    t1Section.style.justifyContent = "center"
                    const t2Section = document.createElement("section");
                    t2Section.append(dislike, dislikeValue);
                    t2Section.style.display = "flex";
                    t2Section.style.flexDirection = "row-reverse";
                    t2Section.style.alignItems = "center"
                    t2Section.style.justifyContent = "center"
                    td1.append(t1Section), td2.append(t2Section);

                    currTr.append(td1, td2);
                }
                // if problem has likes .. then display them
                for (let Obj of probData) {
                    const section1 = document.getElementById(Obj["_id"] + "L").nextElementSibling;
                    const section2 = document.getElementById(Obj["_id"] + "D").nextElementSibling;
                    section1.innerText = Obj["likes"];
                    section2.innerText = Obj["dislikes"];
                }
                // mark all the like buttons disabled if they are already clicked by user
                for (let arr of vis) {
                    disableButtons(arr[0], arr[1], false);
                }
            })
            .catch((err) => {
                console.log("error while submitting problems to the dbs", err);
            })
    }
}
catch (e) {
    console.log("Error encountered while bringing data:", e);
}


