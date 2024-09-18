import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reviews.css";
import img from "../../Assets/5star-removebg-preview.png"
import Ashwin from "../../Assets/Ashwin (1).jpg"
import person2 from "../../Assets/person2.jpg"
import person3 from "../../Assets/ashefa.jpeg"
import person4 from "../../Assets/person4.jpeg"

const Reviews = () => {
  return (
    <div className="overall-reviews">
        <center>
            <h1 style={{marginBottom:"30px", color:"#479ed8"}}>CUSTOMER REVIEWS</h1>
        </center>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
                <div className="headerpfp">
                    <img className="pfp" src={Ashwin}/>
              <h5 class="card-title" style={{color :"#479ed8"}}>Ashwin S</h5>
              </div>
              <p class="card-text">
                "I had a great experience with this insurance provider. The
                claim process was smooth and efficient. Their customer service
                team was very helpful and answered all my questions promptly.
                Highly recommend!"
              </p>
              <img src={img}/>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
            <div className="headerpfp">
            <img className="pfp" src={person2}/>
              <h5 class="card-title" style={{color :"#479ed8"}}>Ann Paul</h5>
              </div>
              <p class="card-text">
                "The coverage options offered were comprehensive and tailored to
                my needs. I appreciated the transparency and the detailed
                information provided. The premium was reasonable, and the entire
                process was hassle-free."
              </p>
              <img src={img}/>

            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
            <div className="headerpfp">
            <img className="pfp" src={person3}/>
              <h5 class="card-title" style={{color :"#479ed8"}}>Ashefa J</h5>
              </div>
              <p class="card-text">
                "While the initial setup was straightforward, I found the
                renewal process a bit confusing. However, the support team was
                very patient and assisted me throughout. Overall, satisfied with
                the coverage and service."
              </p>
              <img src={img}/>

            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
            <div className="headerpfp">
            <img className="pfp" src={person4}/>
              <h5 class="card-title" style={{color :"#479ed8"}}>Saran </h5>
              </div>
              <p class="card-text">
                "I've been with this insurance company for several years now,
                and they have consistently provided excellent service. The
                response time for claims is quick, and I feel secure knowing I’m
                well covered."
              </p>
              <img src={img}/>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
