import * as React from 'react';
import { Stack } from '@fluentui/react';
import IconLikeService from './Services/IconLike.service';

export interface IIconLikeProps {
  description: string;
}

export interface IIconLikeState {
  numLikes: number;
}

export default class IconLike extends React.Component<IIconLikeProps, IIconLikeState> {
  private likeService: IconLikeService;

  constructor(props: IIconLikeProps) {
    super(props);
    this.state = {
      numLikes: 0,
    };
    this.likeService = new IconLikeService();
  }

  componentDidMount() {
    this.fetchLikes();
  }

  fetchLikes = async () => {
    try {
      const numLikes = await this.likeService.getNumLikes();
      this.setState({ numLikes });
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  handleLike = async () => {
    try {
      await this.likeService.postLike();
      this.setState(prevState => ({ numLikes: prevState.numLikes + 1 }));
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  render() {
    const { numLikes } = this.state;
    return (
      <Stack className="container mt-5">
        <div className="like-button bg-white p-2 px-4">
          <button className="btn btn-primary" type="button" onClick={this.handleLike}>Like</button>
          <span style={{ marginLeft: '8px', fontSize: '16px' }}>{numLikes}</span>
        </div>
      </Stack>
    );
  }
}
