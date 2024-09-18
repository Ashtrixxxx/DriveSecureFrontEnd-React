import React from "react";
import "./FlipCard.css";

import engine from "../../Assets/engine.jpg";
import customer from "../../Assets/24x7Customer.jpg";
import lock from "../../Assets/Lock.jpg";
import luggage from "../../Assets/luggage.jpg";

const FlipCards = () => {
  return (
    <div className="flippp">
      <center>
        <h1>ADD-ONS</h1>
      </center>
      <div className="card-container">
        <div className="mycard">
          <div className="card-front">
            <img className="card-images" src={engine} />
          </div>
          <div className="card-back">
            <p>
              Engine is one of the most crucial parts of a car. Unfortunately,
              however, the expenses you incur on the damages to your car’s
              engine are not covered under standard car insurance. Being one of
              the most expensive parts for servicing, you end up spending more
              to recover your car’s engine from an accident. That’s why the
              engine protector add-on is the most ideal solution to feature in
              your insurance policy.
            </p>
          </div>
        </div>

        <div className="mycard">
          <div className="card-front">
            <img className="card-images" src={customer} />
          </div>
          <div className="card-back">
            <p>
              One of the most helpful add-ons for your car insurance, this
              ensures you are never stranded on the road due to any concern
              associated with your car. Our team is just a call or a click away
              to assist you or get to you to help you deal with a car situation
              regardless of where you are stuck in India. So, no matter if you
              have to get a tire changed, or have an expert look into your car’s
              engine or need assistance in settling an accident, you can reach
              out to us at any time and we will be there by your side in a very
              short duration.
            </p>
          </div>
        </div>
        <div className="mycard">
          <div className="card-front">
            <img className="card-images" src={lock} />
          </div>
          <div className="card-back">
            <p>
              Car keys are some of the most misplaced items in the world. From
              forgetting them at a restaurant to losing them at your own home,
              car keys are easily overlooked. Sadly, there are expenses involved
              in getting new keys for your cars as it’s not just the key that
              has to be replaced but the entire locking system as well. That’s
              why this add-on is here to reduce the expenses you are likely to
              incur because of misplaced or lost keys. We take care of the
              entire purchasing and replacing of your car’s lock and keys.
            </p>
          </div>
        </div>
        <div className="mycard">
          <div className="card-front">
            <img className="card-images" src={luggage} />
          </div>
          <div className="card-back">
            <p>
              A car is your personal and private safe where you leave your
              belongings inside until your work outside is done. From laptops
              and expensive gadgets to money or money’s worth of valuables, you
              keep materials inside your car very frequently. But this is not
              without its threat, where it is subjected to instances like thefts
              and burglaries especially when you leave your car in less
              populated avenues or remote places. That’s why the personal
              baggage add-on protects your personal belongings and covers the
              loss you incur because of damage or their theft from the car.
            </p>
          </div>
        </div>

        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default FlipCards;
