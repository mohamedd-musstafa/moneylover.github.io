import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BillIcon from "../../../../../assets/images/bill.png";
// import closeIcon from "../../../../../assets/images/close-icon";
import closeIcon from "../../../../../assets/images/close-icon.png";
import FoodDrink from "../../../../../assets/images/food-drink.png";
import GiftIcon from "../../../../../assets/images/gift.png";
import LeftArrowIcon from "../../../../../assets/images/left-arrow.png";
import OtherIcon from "../../../../../assets/images/money-other.png";
import SalaryIcon from "../../../../../assets/images/money-salary.png";
import SellIcon from "../../../../../assets/images/sell.png";
import Transportation from "../../../../../assets/images/transportation.png";
// import "./index.css";
import "../TransactionStyle.css";

Category.propTypes = {};

const categoryImages = {
  RESTAURANT: BillIcon,
  SHOPPING: Transportation,
  TRANSPORTATION: FoodDrink,
  OTHERS: OtherIcon,
  SALARY: SalaryIcon,
  FREELANCE: GiftIcon,
  INVESTMENT: SellIcon,
};
function Category({
  isCategoryOpen,
  setIsCategoryOpen,
  amount,
  setState,
  setTransactionType,
  categoryText,
  onChooseTransactionType,
}) {
  const onOpenCategoryModal = () => {
    setIsCategoryOpen(true);
  };
  const onCloseCategoryModal = () => setIsCategoryOpen(false);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="select-options-category">
      <button
        className="btn-category category"
        type="button"
        onClick={onOpenCategoryModal}
      >
        <img alt="Icon" src={LeftArrowIcon} className="left-arrow-icon" />
        <span className="category-text">Category</span>
        <div className="category-type-transaction">
          {categoryText !== "" ? (
            <img
              alt="Icon"
              src={categoryImages[categoryText]}
              className="icon-category-type"
            />
          ) : undefined}
          <span className="category-text-display">{categoryText}</span>
        </div>
      </button>
      <Modal
        className="custom-style2"
        isOpen={isCategoryOpen}
        onRequestClose={onCloseCategoryModal}
      >
        <div className="top">
          <button
            type="button"
            onClick={onCloseCategoryModal}
            className="btn-cancel"
          >
            <img alt="icon" src={closeIcon} />
          </button>
          <span className="text">Select Category</span>
        </div>
        <hr className="line-one" />
        <Tabs onSelect={setTransactionType}>
          <TabList>
            <Tab>EXPENSE</Tab>
            <Tab>INCOME</Tab>
          </TabList>
          <TabPanel>
            <ul className="ul-type-transaction">
              <li>
                <button
                  className="btn-type-transaction"
                  type="button"
                  onClick={onChooseTransactionType("RESTAURANT", "expense")}
                >
                  <div className="div-type-transaction">
                    <img alt="icon" className="icon-expense" src={BillIcon} />
                    <span className="name-expense"> Restaurant</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className="btn-type-transaction"
                  type="button"
                  onClick={onChooseTransactionType("SHOPPING", "expense")}
                >
                  <div className="div-type-transaction">
                    <img
                      alt="icon"
                      className="icon-expense"
                      src={Transportation}
                    />
                    <span className="name-expense"> Shopping</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className="btn-type-transaction"
                  type="button"
                  onClick={onChooseTransactionType("TRANSPORTATION", "expense")}
                >
                  <div className="div-type-transaction">
                    <img alt="icon" className="icon-expense" src={FoodDrink} />
                    <span className="name-expense"> Transportation</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className="btn-type-transaction"
                  type="button"
                  onClick={onChooseTransactionType("OTHERS", "expense")}
                >
                  <div className="div-type-transaction">
                    <img alt="icon" className="icon-expense" src={OtherIcon} />
                    <span className="name-expense"> Others</span>
                  </div>
                </button>
              </li>
            </ul>
          </TabPanel>
          <TabPanel>
            <ul className="ul-type-transaction">
              <li>
                <button
                  className="btn-type-transaction"
                  type="button"
                  onClick={onChooseTransactionType("SALARY", "income")}
                >
                  <div className="div-type-transaction">
                    <img alt="icon" className="icon-income" src={SalaryIcon} />
                    <span className="name-expense"> Salary</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className="btn-type-transaction"
                  type="button"
                  onClick={onChooseTransactionType("FREELANCE", "income")}
                >
                  <div className="div-type-transaction">
                    <img alt="icon" className="icon-income" src={GiftIcon} />
                    <span className="name-expense">Freelance</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className="btn-type-transaction"
                  type="button"
                  onClick={onChooseTransactionType("INVESTMENT", "income")}
                >
                  <div className="div-type-transaction">
                    <img alt="icon" className="icon-income" src={SellIcon} />
                    <span className="name-expense"> Investment</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className="btn-type-transaction"
                  type="button"
                  onClick={onChooseTransactionType("OTHERS", "income")}
                >
                  <div className="div-type-transaction">
                    <img alt="icon" className="icon-income" src={OtherIcon} />
                    <span className="name-expense"> Others</span>
                  </div>
                </button>
              </li>
            </ul>
          </TabPanel>
        </Tabs>
      </Modal>
      <label className="label-input">Amount</label>
      <input
        className="input-amount"
        name="amount"
        value={amount}
        onChange={onInputChange}
      />
    </div>
  );
}

export default Category;
