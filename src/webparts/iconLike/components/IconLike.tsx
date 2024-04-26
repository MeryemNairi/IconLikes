import * as React from 'react';
import { Stack } from '@fluentui/react';
import { sp } from '@pnp/sp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import IconLikeService from './Services/IconLike.service';

export interface IIconLikeProps {
  description: string;
}

export interface IIconLikeState {
  numLikes: number;
  currentUser: string;
  userLiked: boolean;
}

export default class IconLike extends React.Component<IIconLikeProps, IIconLikeState> {
  private likeService: IconLikeService;

  constructor(props: IIconLikeProps) {
    super(props);
    this.state = {
      numLikes: 0,
      currentUser: '',
      userLiked: false,
    };
    this.likeService = new IconLikeService();
  }

  componentDidMount() {
    this.fetchLikes();
    this.fetchCurrentUser();
  }

  fetchLikes = async () => {
    try {
      const numLikes = await this.likeService.getNumLikes();
      this.setState({ numLikes });
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  fetchCurrentUser = async () => {
    try {
      const currentUser = await sp.web.currentUser.get();
      this.setState({ currentUser: currentUser.Title });
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  handleLike = async () => {
    try {
      if (this.state.userLiked) {
        await this.likeService.removeLike();
        this.setState(prevState => ({
          numLikes: prevState.numLikes - 1,
          userLiked: false,
        }));
      } else {
        await this.likeService.postLike();
        this.setState(prevState => ({
          numLikes: prevState.numLikes + 1,
          userLiked: true,
        }));
      }
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  render() {
    const { numLikes, currentUser, userLiked } = this.state;
    return (
      <Stack className="container mt-5">
        <div className="like-info">
          <p className="user-info">{currentUser && `Connected as: ${currentUser}`}</p>
        </div>
        <div className="like-button bg-white p-2 px-4">
          <button
            className={`btn btn-primary ${userLiked ? 'liked' : ''}`}
            type="button"
            onClick={this.handleLike}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color={userLiked ? 'red' : 'pink'} // Transparent par défaut, rouge quand aimé
              style={{ fontSize: '40px', border: 'none', background: 'none' }} // Taille plus grande, sans cadre ni background
            />
          </button>
          <span style={{ marginLeft: '8px', fontSize: '16px' }}>{numLikes}</span>
        </div>
      </Stack>
    );
  }
}
