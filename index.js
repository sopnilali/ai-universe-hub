const loadData= async (isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    const data = await res.json()
    const allData = data.data.tools;
    // console.log(chatGPT);
    cardDisplay(allData,isShowAll);
}
const cardDisplay = (allData, isShowAll) => {
        // display show all button if there are more than 06 cards available
        const showAllContainer = document.getElementById('show-all-container');
        if (allData.length > 6 && !isShowAll)
        {
            showAllContainer.classList.remove('hidden');
        }
        else {
            showAllContainer.classList.add('hidden');
        } 
        if (!isShowAll) {
            allData = allData.slice(0, 6);
        } 
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerText = ' ';
        allData.forEach(allData => {
        // console.log(allData);
        // 2 create a div
        const gptCard = document.createElement('div');
        gptCard.classList = `border border-gray-200 rounded-lg  `;
        // 3: set inner html
        
        gptCard.innerHTML = `
        <div class="m-5">
                    <img src="${allData.image}" alt="${allData.name}" title="${allData.name}">
                    <h3 class="text-xl font-semibold my-3 ">Features</h3>
                    <li> ${allData.features[0] ? allData.features[0] : "No Data found"}</li>
                    <li> ${allData.features[1] ? allData.features[1] : "No Data found"}</li>
                    <li> ${allData.features[2] ? allData.features[2] : "No Data found"}n</li>
                    <hr class="my-4">
                 <div class="flex items-center justify-between mt-5">
                        <div>
                            <h2 class="text-2xl font-semibold ">${allData.name}</h2>
                            <p><i class="fa-solid fa-box-archive"></i> ${allData.published_in}</p>
                        </div>
                <div><button onclick="loadCardDetails('${allData.id}')" class="fa-solid fa-circle-right text-2xl"></button></div>
                </div>
                </div>
        `;
        // 4 append child
        cardContainer.appendChild(gptCard);
    });
}

//load details
const loadCardDetails = async (id)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json()
    const cardDetails = data.data;
    show_details_modal.showModal();
    displayCardDetails(cardDetails);
    
}

const displayCardDetails = (datadetails)=>{
    const displayCardDetails = document.getElementById('show-details-container');
    displayCardDetails.innerHTML = `
    <div class="border border-gray-300 p-6 my-6 bg-orange-200">
    <img class="my-2" src="${datadetails.image_link[0] }" alt="${datadetails.tool_name}" title="${datadetails.tool_name}">
    <h2>${datadetails.description}</h2>
    <div class="flex gap-6 justify-center">
        <span class="bg-white  rounded-lg p-2 text-green-500 my-8 ">
        ${datadetails.pricing[0].price} 
        <br> ${datadetails.pricing[0].plan}</span>
        <span class="bg-white rounded-lg p-2 text-green-500 my-8 ">
        ${datadetails.pricing[1].price ? datadetails.pricing[1].price
            : "No Data Found"
        }
        <br>${datadetails.pricing[1].plan ? datadetails.pricing[1].plan
            : "No Data Found"}</span>
        <span class="bg-white rounded-lg p-2 text-green-500 my-8 ">
        ${datadetails.pricing[2].price ? datadetails.pricing[1].price
            : "No Data Found"}
        <br>${datadetails.pricing[2].plan ? datadetails.pricing[1].plan
            : "No Data Found"}</span>
    </div>
    <div class="flex ">
    <div class="flex-1">
        <h2>Features</h2>
        <li>${
            datadetails.features[1].feature_name
              ? datadetails.features[1].feature_name
              : "No Data Found"
          }</li>
        <li>${
            datadetails.features[2].feature_name
              ? datadetails.features[2].feature_name
              : "No Data Found"
          }</li>
        <li>${
            datadetails.features[3].feature_name
              ? datadetails.features[3].feature_name
              : "No Data Found"
          }</li>
    </div>
    <div class="flex-1">
        <h2>Integrations</h2>
        <li>${
            datadetails.integrations[0]
              ? datadetails.integrations[0]
              : "No Data Found"
          }</li>
        <li>${
            datadetails.integrations[1]
              ? datadetails.integrations[1]
              : "No Data Found"
          }</li>
        <li>${
            datadetails.integrations[2]
              ? datadetails.integrations[2]
              : "No Data Found"
          }</li>
    </div>
</div>
</div>
    `
}


// sort button add event listener
const handleShortButton = () => {

  // get current cards than sort by date of birth
  const cards = Array.from(document.getElementById("card-container").children);
  cards.sort((a, b) => {
    const aDate = new Date(a.querySelector(".fa-box-archive").nextSibling.textContent);
    const bDate = new Date(b.querySelector(".fa-box-archive").nextSibling.textContent);
    return aDate - bDate;
  });


  // again add sorted card in the container
  const cardsContainer = document.getElementById("card-container");
  cardsContainer.innerHTML = "";
  cards.forEach((card) => cardsContainer.appendChild(card));

}

// handle show all
const handleShowAll = () => {
    loadData(true);
}
loadData();


