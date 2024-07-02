import React from "react";
import ReactDOM from "react-dom";


  function openCity(evt, cityName) {
    console.log("yo");
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  
  document.getElementById("defaultOpen").click();


ReactDOM.render(
    
<div class="test grid_container">
  <div class="tab local_details">
    <button class="tablinks" onClick={openCity(event,'All')} id="defaultOpen">All</button>
    <button class="tablinks" onClick="openCity(event, 'Paris')">Dhams</button>
    <button class="tablinks" onClick="openCity(event, 'Tokyo')">Coorporate Trips</button>
    <button class="tablinks" onClick="openCity(event, 'Tokyo')">Weekend Trips</button>
    <button class="tablinks" onClick="openCity(event, 'Tokyo')">International Trips</button>
  </div>
  
  <div id="All" class="tabcontent local_details">
    <div class="grid_container_info">
      <div class="info_grid">
        <a href="#" class="info_grid_">
          <div class="info_grid_content">
            <img src="./Images/bali.png" class="info_grid_img"/>
            <h3 class="description_basic">Kajbfh</h3>
            <p class="description_basic">cdkbwefbweyh duywgeygsducbwyegf</p>
            <p class="description_basic">cdkbwefbweyh duywgeygsducbwyegf</p>
          </div>
        </a>
      </div>
      <div class="gap_blue">
      </div>
      <div class="info_grid">
        <a href="#" class="info_grid_">
          <div class="info_grid_content">
            <img src="./Images/bali.png" class="info_grid_img"/>
            <h3 class="description_basic">Kajbfh</h3>
            <p class="description_basic">cdkgwicgwefybffbwjegfbwefbweyh duywgeygsducbwyegf</p>
          </div>
        </a>
      </div>
      <div class="gap_blue">
      </div>
      <div class="info_grid">
        <a href="#" class="info_grid_">
          <div class="info_grid_content">
            <img src="./Images/bali.png" class="info_grid_img"/>
            <h3 class="description_basic">Kajbfh</h3>
            <p class="description_basic">cdkgwicgwefybffbwjegfbwefbweyh duywgeygsducbwyegf</p>
          </div>
        </a>
      </div>
      <div class="info_grid">
        <a href="#" class="info_grid_">
          <div class="info_grid_content">
            <img src="./Images/bali.png" class="info_grid_img"/>
            <h3 class="description_basic">Kajbfh</h3>
            <p class="description_basic">cdkgwicgwefybffbwjegfbwefbweyh duywgeygsducbwyegf</p>
          </div>
        </a>
      </div>
      <div class="gap_blue">
        
      </div>
      <div class="info_grid">
        <a href="#" class="info_grid_">
          <div class="info_grid_content">
            <img src="./Images/bali.png" class="info_grid_img"/>
            <h3 class="description_basic">Kajbfh</h3>
            <p class="description_basic">cdkgwicgwefybffbwjegfbwefbweyh duywgeygsducbwyegf</p>
          </div>
        </a>
      </div>
      <div class="gap_blue">
        
      </div>
      <div class="info_grid">
        <a href="#" class="info_grid_">
          <div class="info_grid_content">
            <img src="./Images/bali.png" class="info_grid_img"/>
            <h3 class="description_basic">Kajbfh</h3>
            <p class="description_basic">cdkgwicgwefybffbwjegfbwefbweyh duywgeygsducbwyegf</p>
          </div>
        </a>
      </div>
    </div>
    
  </div>
  
  <div id="Paris" class="tabcontent">
    <h3>Paris</h3>
    <p>Paris is the capital of France.</p> 
  </div>
  
  <div id="Tokyo" class="tabcontent">
    <h3>Tokyo</h3>
    <p>Tokyo is the capital of Japan.</p>
  </div>
     
</div>
    , document.getElementById("root"));
