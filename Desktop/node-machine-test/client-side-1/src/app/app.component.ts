import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;

  title = 'client-side';
  public product = {};
  public list: any = [];
  submitted = false;

  public constructor(private http: HttpClient,private formBuilder: FormBuilder) { }


  public ngOnInit() {

    // this is hardcoded.
    /*this.list = [{
      productId: '1',
      productName: 'VIVO',
      categoryId: 'V10',
      categoryName: 'Mobile',
    }, {
      productId: '1',
      productName: 'VIVO',
      categoryId: 'V10',
      categoryName: 'Mobile'
    }];*/

    this.formInit();

    this.listProduct();
  }

  formInit(){
    this.myForm = this.formBuilder.group({
      productName:   ['', Validators.required],
      productDesc:   [''],
      categoryId:    [ , [Validators.required]],
      categoryName:  ['', Validators.required],
    });
  }

  /** CALL API TO LIST THE PRODCUT */
  public async listProduct() {
    const getUrl = 'http://localhost:3000/';

    const list =  await this.http.get(getUrl).toPromise();
    this.list = list;

    // this.ngOnInit();
  }

  /** Call API HERE FOR SERVER SIDE */
  public async addProduct() {

    // stop here if form is invalid
    if(this.myForm.invalid) {
      return;
    }else{
      this.product = {
        "productName"  : this.myForm.value.productName,
        "productDesc"  : this.myForm.value.productDesc,
        "categoryId"   : this.myForm.value.categoryId,
        "categoryName" : this.myForm.value.categoryName
      };
    console.log('add.product.', this.product);

    const postUrl = 'http://localhost:3000/';
    const postBody = this.product;

    await this.http.post(postUrl, postBody).toPromise();

    this.product = {};

    this.formInit();
    this.listProduct();
    }
  }
}