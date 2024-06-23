import React from "react";
import axios from "axios"
import { useParams } from "react-router-dom";

class CatDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: null,
    };
  }

  componentDidMount() {
    console.log("mounted");
    this.fetchCatData(this.props.slug);
  }

  componentDidUpdate(prevProps) {
  if (this.props.slug !== prevProps.slug) {
    console.log("updated");
    this.fetchCatData(this.props.slug);
    this.setState({cat:null})
  }
}

  fetchCatData = async (slug) => {
    const url = `https://api.thecatapi.com/v1/images/search?breed_id=${slug}`;
    try {
      const response = await axios.get(url);
      const data = await response.data;
      this.setState({ cat: data[0] });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { cat } = this.state;

    if (!cat) {
      return <div>Loading...</div>;
    }

    return (
      <div className="cat-image">
        <img src={cat.url} alt={cat.id} width="800px" />
      </div>
    );
  }
}

const Cat = () => {
  const { slug } = useParams();
  return (
    <CatDetails slug={slug} />
  );
}

export default Cat;
