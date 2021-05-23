import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageUploadService } from '../../services/image-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { find, get, pull } from 'lodash';
import { MomentService } from 'src/services/moment.service';

@Component({
  selector: 'app-moment-add',
  templateUrl: './moment-add.component.html',
  styleUrls: ['./moment-add.component.css']
})
export class MomentAddComponent implements OnInit {
  addMomentForm: FormGroup;
  loading = false;
  submitted = false;
  @ViewChild('tagInput') tagInputRef: ElementRef;
  tags: string[] = [];
  imageObj: File;
  imageUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private imageUploadService: ImageUploadService,
    private momentService: MomentService) { 
      this.addMomentForm = this.formBuilder.group({
        title: ['', Validators.required],
        comment: ['', Validators.required],
        tag: [undefined],

      });
    }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.addMomentForm.controls; }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.addMomentForm.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.addMomentForm.controls.tag.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
  }

  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUploadService.imageUpload(imageForm).subscribe(res => {
      this.imageUrl = res['image'];
    });
  }

  onSubmit() {
    if(this.imageUrl != null){
      this.submitted = true;

      // stop here if form is invalid
      if (this.addMomentForm.invalid) {
          return;
      }

      this.loading = true;

      let body = {
          title: this.f.title.value,
          userId: '60a126eb5ef107321d5460c3',
          images: [this.imageUrl],
          tags: [this.tags],
          comment: this.f.comment.value,
          createdAt: new Date()
      }
      console.log(body);
      
      this.momentService.save(body)
          .subscribe(
              data => {
                  this.router.navigate(['/moment-list']);
              },
              error => {
                  this.loading = false;
              });
    }
  }
}
