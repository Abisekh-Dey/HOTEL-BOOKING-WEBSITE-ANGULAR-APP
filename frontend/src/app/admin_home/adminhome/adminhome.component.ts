import { Component, OnInit, HostListener } from '@angular/core';
import { Hotel } from '../../common/hotel';
import { HotelService } from '../../services/hotel.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';
import { SearchserviceService } from '../../services/searchservice.service';
import  Typed  from 'typed.js';//from node library (npm install --save typed.js)

// interface SearchFormValues {
//   destination: string;
//   datein: string;
//   dateout: string;
//   rooms: string;
//   persons: string;
//   prices: string;
// }

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent implements OnInit {
  hotels: Hotel[] = [];
  isLoggedIn = false;
  userName: string | null = '';

  constructor(private hotelService: HotelService,private adminAuthService: AdminAuthService,private router: Router,private searchServiceService:SearchserviceService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.adminAuthService.getLoginState();
    this.userName = this.adminAuthService.getAdminName();

    if (this.isLoggedIn) {
      // Show admin's name instead of sign-up and sign-in buttons
      this.userName = this.adminAuthService.getAdminName();
      if(this.userName.length>10){
        this.userName = this.userName.slice(0,10)+"..."
      }
    }

    const options1 = {
      strings: ["Add Hotels", "Find Hotels", "Update Hotels", "Delete Hotels", "Get Hotels"],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 3000,
      loop: true
    };
    
    const typed1 = new Typed("#element1", options1);

    const options2 = {
      strings: ["Add Rooms", "Find Rooms", "Update Rooms", "Delete Rooms", "Get Rooms"],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 3000,
      loop: true
    };
    
    const typed2 = new Typed("#element2", options2);

    const options3 = {
      strings: ["All Admins", "Delete Admins"],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 3000,
      loop: true
    };
    
    const typed3 = new Typed("#element3", options3);
    
    
    const today: Date = new Date();
    this.updateDateDisplay(today);

    const destinations: HTMLSelectElement = document.querySelector("#destinations") as HTMLSelectElement;
    const rooms: HTMLSelectElement = document.querySelector("#rooms") as HTMLSelectElement;
    const persons: HTMLSelectElement = document.querySelector("#persons") as HTMLSelectElement;
    const prices: HTMLSelectElement = document.querySelector("#prices") as HTMLSelectElement;

    const destination: string[] = [
      "Agra",
      "Ahmedabad",
      "Aizawl",
      "Amritsar",
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bangalore",
      "Bhopal",
      "Bihar",
      "Chandigarh",
      "Chennai",
      "Chhattisgarh",
      "Coimbatore",
      "Delhi",
      "Dehradun",
      "Gangtok",
      "Goa",
      "Gujarat",
      "Guwahati",
      "Haridwar",
      "Haryana",
      "Himachal Pradesh",
      "Hyderabad",
      "Imphal",
      "Indore",
      "Itanagar",
      "Jaipur",
      "Jammu & Kashmir",
      "Jharkhand",
      "Jodhpur",
      "Kanpur",
      "Karnataka",
      "Kashmir",
      "Kerala",
      "Kochi",
      "Kolkata",
      "Lucknow",
      "Madhya Pradesh",
      "Maharashtra",
      "Manali",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Mumbai",
      "Mysore",
      "Nagpur",
      "Nagaland",
      "Odisha",
      "Patna",
      "Pondicherry",
      "Punjab",
      "Pune",
      "Rajasthan",
      "Ranchi",
      "Shimla",
      "Shillong",
      "Sikkim",
      "Surat",
      "Tamil Nadu",
      "Telangana",
      "Thiruvananthapuram",
      "Tripura",
      "Udaipur",
      "Uttar Pradesh",
      "Uttarakhand",
      "Varanasi",
      "Vijayawada",
      "Visakhapatnam",
      "Vadodara",
      "West Bengal"
    ];
    
    const room: string[] = ["1-Room", "2-Rooms", "3-Rooms", "4-Rooms", "5-Rooms"];
    const person: string[] = ["1-Person", "2-Persons", "3-Persons", "4-Persons", "5-Persons", "6-Person", "7-Persons", "8-Persons", "9-Persons", "10-Persons"];
    const price: string[] = ["₹0-₹1499", "₹1500-₹2499", "₹2500-₹4999", "₹5000+"];

    for (const i of destination) {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = i;
      option.textContent = i;
      destinations.appendChild(option);
    }
    for (const i of room) {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = i;
      option.textContent = i;
      rooms.appendChild(option);
    }
    for (const i of person) {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = i;
      option.textContent = i;
      persons.appendChild(option);
    }
    for (const i of price) {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = i;
      option.textContent = i;
      prices.appendChild(option);
    }

    const form: HTMLFormElement = document.querySelector("#form") as HTMLFormElement;
    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const form: HTMLFormElement = e.target as HTMLFormElement;
      const data: FormData = new FormData(form);
      // console.log([
      //   data.get('destination'),
      //   data.get('datein'),
      //   data.get('dateout'),
      //   data.get('rooms'),
      //   data.get('persons'),
      //   data.get('prices')
      // ]);
      const formValues:any = {
        destination: data.get('destination') as string,
        datein: data.get('datein') as string,
        dateout: data.get('dateout') as string,
        rooms: data.get('rooms') as string,
        persons: data.get('persons') as string,
        prices: data.get('prices') as string
      };
      this.onSearch(formValues);
    });
  }

  onSearch(formValues:any) {
    // this.searchServiceService.setSearchData({
    //   destination: formValues.destination,
    //   checkInDate: formValues.datein,
    //   checkOutDate: formValues.dateout,
    //   rooms: formValues.rooms,
    //   guests: formValues.persons,
    //   pricePerNight: formValues.prices,
    // });

    // Redirect to the hotels page or perform search logic here
    this.router.navigate(['/authentication/adminSignin/adminHome/allHotels'],{
      queryParams: {
        destination: formValues.destination,
        checkInDate: formValues.datein,
        checkOutDate: formValues.dateout,
        rooms: formValues.rooms,
        guests: formValues.persons,
        pricePerNight: formValues.prices
      }
    });
  }

  logout(): void {
    this.adminAuthService.logout();
    this.isLoggedIn = false;
    this.userName = null;
    // this.router.navigate(['authentication/adminSignup/adminHome'])
  }

  listhotels() {
    this.hotelService.getHotelList().subscribe(
      data => {
        this.hotels = data;
      }
    )
  }

  updateDateDisplay(today: Date): void {
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    (document.querySelector("#datein") as HTMLInputElement).valueAsDate = today;

    const nextDay: Date = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    (document.querySelector("#dateout") as HTMLInputElement).valueAsDate = nextDay;

    const dayin: string = weekdays[today.getDay()];
    (document.querySelector("#dayin") as HTMLElement).innerText = dayin;

    const dayout: string = weekdays[today.getDay() + 1];
    (document.querySelector("#dayout") as HTMLElement).innerText = dayout;
  }

  activeSection = 'Home'; // default section

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + 190; // + header size which is 78px but i have written 190 to add the active class in "more" in the nav bar 
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.activeSection = section.getAttribute('id')!;
      }
    });
  }
}
