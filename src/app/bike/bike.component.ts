import { Component, OnInit } from "@angular/core";
import { Product } from "../product";
import { checkAndUpdateBinding } from "@angular/core/src/view/util";
import { pipeDef } from "@angular/core/src/view";

@Component({
  selector: "app-bike",
  templateUrl: "./bike.component.html",
  styleUrls: ["./bike.component.css"]
})
export class BikeComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: "Adult Male Bike",
      price: 20.5,
      image: "http://via.placeholder.com/250x250?text=Adult%20Male%20Bike",
      product_type: "bike"
    },
    {
      id: 2,
      name: "Adult Female Bike",
      price: 20.5,
      image: "http://via.placeholder.com/250x250?text=Adult%20Female%20Bike",
      product_type: "bike"
    },
    {
      id: 3,
      name: "Kids Unisex Bike",
      price: 12.75,
      image: "http://via.placeholder.com/250x250?text=Kids%20Unisex%20Bike",
      product_type: "bike"
    },
    {
      id: 4,
      name: "Adult Unisex Helmet",
      price: 4.0,
      image: "http://via.placeholder.com/250x250?text=Adult%20Unisex%20Helmet",
      product_type: "accessory"
    },
    {
      id: 5,
      name: "Kids Unisex Helmet",
      price: 3.5,
      image: "http://via.placeholder.com/250x250?text=Kids%20Unisex%20Helmet",
      product_type: "accessory"
    },
    {
      id: 6,
      name: "Insurance",
      price: 9.99,
      image: "http://via.placeholder.com/250x250?text=Insurance",
      product_type: "addon"
    }
  ];

  bikeItems = this.sortItem("bike");
  accessoryItems = this.sortItem("accessory");
  addonItems = this.sortItem("addon");
  totalValue: any = 0;
  validIpt: boolean = false;
  pristineStatus: boolean = true;

  constructor() {}

  ngOnInit() {
    this.products.forEach(element => {
      element["choose"] = false;
    });
    this.pristineStatus = true;
  }

  sortItem(selName: any): Product[] {
    return this.products.filter(function(product) {
      return product.product_type === selName;
    });
  }

  changeTotalVal(product: any) {
    this.pristineStatus = false;
    let tmpObj = this.products.filter(obj => {
      return obj.product_type === product.product_type;
    });
    tmpObj.forEach(element => {
      element["choose"] = false;
    });
    product.choose = true;

    this.totalValue = 0;
    let cnt = 0;
    this.products.forEach(element => {
      if (element["choose"] === true) {
        this.totalValue += element.price;
      }
      if (element["choose"] === true && element.product_type !== "addon") {
        cnt++;
      }
    });

    // When choose a bike and its accessary, the order will be valid
    if (cnt === 2) {
      this.validIpt = true;
    }

    //JavaScript float calculation is not accurate
    this.totalValue = this.totalValue.toFixed(2);
  }
}
