import React, { useState,useEffect } from "react";
import { apiResponse, cartItemModel, userModel } from "../../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { inputHelper } from "../../../Helper";
import { MiniLoader } from "../Common";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";

export default function CartPickUpDetails() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  let grandTotal = 0;
  let totalItems = 0;
  const initialUserData = {
    name: userData?.fullName, 
    email: userData?.email,
    phoneNumber: "",
  };
  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  //console.log(totalItems);
 // console.log(grandTotal);

  const [userInput, setUserInput] = useState(initialUserData);
  const [initiatePayment] = useInitiatePaymentMutation();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);

  };
  useEffect(() => {
    setUserInput({
      name: userData.fullName,
      email: userData.email,
      phoneNumber: "",
    });
  }, [userData]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

  const { data }: apiResponse = await initiatePayment(userData.id);
   
    navigate("/payment", {
      state: { apiResult: data?.result, userInput },
    });
    console.log("data:CartPickUpDetails");
    console.log(data);



  };
  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            onChange={handleUserInput}
            value={userInput.name}
            type="text"
            className="form-control"
            placeholder="name..."
            name="name"
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            onChange={handleUserInput}
            value={userInput.email}
            type="email"
            className="form-control"
            placeholder="email..."
            name="email"
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            onChange={handleUserInput}
            value={userInput.phoneNumber}
            type="number"
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Total Cost : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={loading}
        >
          {loading ? <MiniLoader /> : "Looks Good? Place Order!"}
        </button>
      </form>
    </div>
  );
}

// export default CartPickUpDetails;
