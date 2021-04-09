
 $("#job-search").on("submit", async function (event) {
   event.preventDefault();
   fetchJobs();
   console.log("hi");

 });

 async function fetchJobs() {
   try {
     const response = await fetch(`/job-search`, {
       method: "POST",
       body: JSON.stringify({
         description: $("#description").val(),
         fulltime: $("#fulltime").is(":checked"),
       }),
     });
     const { results } = await response.json();
      renderJobList(results);
      console.log(results)
   } catch (error) {
     console.log(error);
   }
 }

 const renderJobsHTML = (job) => {
   return $(`
       <div class="card" style="width: 30rem;">
       <div class="card-body">
       <img src="${job.company_logo}" />
       <h5 class="card-company">${job.company}</h5>
       <p class="card-location">${job.location}</p>
       <ul class="list-group">
           <li class="list-item">Title: ${job.title}</li>
           <li class="list-item">Location: ${job.description}</li>
           <li class="list-item">${job.how_to_apply}</li>
       </ul>
       </div>
       </div>
      `).data("job", job);
 };

 function renderJobList(jobList) {
   $("#cow").remove();
   $("#results").empty();
   jobList.forEach((job) => {
     $("#results").append(renderJobsHTML(job));
   });
 }

 async function fetchQuote() {
   const response = await fetch("/cowspiration");
   const { cow } = await response.json();
   $("#results")
     .empty()
     .append($(`<pre>${cow}</pre>`));
 }

 async function fetchWeather() {
   if (!navigator || !navigator.geolocation) {
     $('#weather').append($('<h3>Weather not available on this browser</h3>'))
   }
 
   navigator.geolocation.getCurrentPosition(async (position) => {
     const { coords: { latitude, longitude } } = position;
 
     const response = await fetch(`/weather?lat=${ latitude }&lon=${ longitude }`);
     const { results } = await response.json();
 
     if (results.daily) {
       $('#weather').empty();
 
       results.daily.forEach(day => {
         const { weather: [{ icon }] } = day;
 
         $('#weather').append($(`
           <img src="http://openweathermap.org/img/wn/${ icon }@2x.png" />
         `));
       });
     }
   }, async (error) => {
     const result = await navigator.permissions.query({ name: 'geolocation' });
     if (result.state == "denied") {
       $('#weather').html(
         $(`<div>
             <h3>You have denied access to location services.</h3>
             <h4>If you wish to see your forecast, update your settings and refresh.</h4>
           </div>`)
       )
     }
   });
 }
 
 fetchWeather();

 fetchQuote();