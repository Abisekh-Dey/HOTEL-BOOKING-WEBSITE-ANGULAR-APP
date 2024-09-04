import { Component, OnInit,HostListener } from '@angular/core';
import { Hotel } from '../common/hotel';
import { Feedback} from '../common/feedback';
import { SearchserviceService } from '../services/searchservice.service';
import { FeedbackserviceService } from '../services/feedbackservice.service';
import { AuthService } from '../services/auth-service.service';
import { Router} from '@angular/router'

// interface SearchFormValues {
//   destination: string;
//   datein: string;
//   dateout: string;
//   rooms: string;
//   persons: string;
//   prices: string;
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels: Hotel[] = [];
  isLoggedIn = false;
  userName: string | null = '';
  d1:string="Kolkata";
  d2:string="Delhi";
  d3:string="Mumbai";
  d4:string="Bangalore";
  d5:string="Chennai";
  d6:string="Hydrabad";
  d7:string="Ahmedabad";
  d8:string="Pune";
  d9:string="Jaipur";
  
  cin_date:string="";
  cout_date:string="";
  r:string="1-Room";
  persn:string="1-Person";
  cost:string="₹0-₹1499"
  userId:string|null=""
  errorstatus:number=0;

  feedback: Feedback = {
    name: '',
    email:"",
    subject:"",
    message:"",
  };

  constructor(private authService: AuthService,private searchServiceService:SearchserviceService,private router: Router,private feedbackservice: FeedbackserviceService) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLoginState();
    this.userName = this.authService.getAdminName();
    this.userId = this.authService.getUserId();

    if (this.isLoggedIn) {
      // Show admin's name instead of sign-up and sign-in buttons
      this.userName = this.authService.getAdminName();
      if(this.userName.length>10){
        this.userName = this.userName.slice(0,10)+"..."
      }
    }
    
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

  onSearch(formValues: any) {
    // this.searchServiceService.setSearchData({
    //   destination: formValues.destination,
    //   checkInDate: formValues.datein,
    //   checkOutDate: formValues.dateout,
    //   rooms: formValues.rooms,
    //   guests: formValues.persons,
    //   pricePerNight: formValues.prices,
    // });

    // Redirect to the hotels page or perform search logic here
    this.router.navigate(['/allHotels'],{
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
  showhotels(dest:any):void{
    this.router.navigate(['/allHotels'],{
      queryParams: {
        destination: dest,
        checkInDate: this.cin_date,
        checkOutDate: this.cout_date,
        rooms: this.r,
        guests: this.persn,
        pricePerNight: this.cost
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = null;
  
    // Hide the admin name and show the sign-up and sign-in buttons without reloading the page
    // You can update the DOM or use Angular bindings to reflect the logout state
  }
  

  // listhotels() {
  //   this.hotelService.getHotelList().subscribe(
  //     data => {
  //       this.hotels = data;
  //       console.log("hello");
  //     }
  //   )
  // }

  updateDateDisplay(today: Date): void {
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    (document.querySelector("#datein") as HTMLInputElement).valueAsDate = today;
    this.cin_date=this.formatDate(today);

    const nextDay: Date = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    (document.querySelector("#dateout") as HTMLInputElement).valueAsDate = nextDay;
    this.cout_date=this.formatDate(nextDay);

    const dayin: string = weekdays[today.getDay()];
    (document.querySelector("#dayin") as HTMLElement).innerText = dayin;

    const dayout: string = weekdays[today.getDay() + 1];
    (document.querySelector("#dayout") as HTMLElement).innerText = dayout;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  activeSection = 'home'; // default section

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

  saveMessage(): void {
    const data = {
      name: this.feedback.name,
      email: this.feedback.email,
      subject: this.feedback.subject,
      message: this.feedback.message
    };

    this.feedbackservice.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          if(this.errorstatus!==0){
            this.errorstatus=0;
          }
        },
        error: (e) => {
          console.error(e);
          this.errorstatus=e.status;
          console.log(this.errorstatus);
        }
      });
  }
  reset(): void {
    this.errorstatus=0
    this.feedback = {
      name: '',
      email:"",
      subject:"",
      message:"",
    };
  }
}
