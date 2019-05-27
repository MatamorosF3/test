import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-posts-lists',
  templateUrl: './posts-lists.component.html',
  styleUrls: ['./posts-lists.component.scss']
})
export class PostsListsComponent implements OnInit {
  posts: Post[];
  currentUser: User;

  constructor(
    private postService: PostService,
    private router: Router,
    private data: DataService,
    private authenticationService: AuthenticationService
  )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    this.data.changeTitle("Posts");
    this.postService.getPosts().subscribe( (posts: Post[]) => {
      this.posts = posts;
    });
  }

  editPost(postId){
    this.router.navigate(['/edit-post'], { queryParams: { postId: postId } });
  }

  deletePost(postId){
    this.postService.deletePost(postId).subscribe( () => {
      const postIndex = this.posts.findIndex( (post) => post.id === postId);
      this.posts.splice(postIndex, 1);
    });
  }

  get isViewer(){
      return this.currentUser.role == 'VIEWER';
  }


}
