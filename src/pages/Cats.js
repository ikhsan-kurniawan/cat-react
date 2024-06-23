import React from "react";
import axios from "axios"
import { Route, Routes, NavLink } from "react-router-dom";
import Cat from "./Cat"

const CatList = ({
  cat: {id, name}
}) => {
  return (
    <div className="cat-wrapper">
      <div className="cat-name">
        <NavLink to={`/cats/${id}`}>{name}</NavLink>
      </div>
    </div>
  );
}

class Cats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cats: null,
    }
  }

  componentDidMount(){
    this.fetchCatsData();
  }

  fetchCatsData = async () => {
    const url = "https://api.thecatapi.com/v1/breeds";
    try {
      const response = await axios.get(url);
      const data = await response.data;
      this.setState({
        cats: data,
      });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const {cats} = this.state;

    if (!cats) {
      return (
        <div className="cats-wrapper">Loading...</div>
      )
    }

    return (
      <div className="cats-wrapper">
        <div className="cats-list">
          {cats.map((cat) => {
            return (
              <CatList key={cat.id} cat={cat} />
            )
          })}
        </div>
        <div className="cat-description">
          <Routes>
            <Route path="/" element={<h1>Choose any of the cats</h1>} />
            <Route path="/:slug" element={<Cat />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default Cats;
