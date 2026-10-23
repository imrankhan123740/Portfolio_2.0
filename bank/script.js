function showPage(pageId) {

    let pages = document.querySelectorAll(".page");

    for (let i = 0; i < pages.length; i++) {

        if (pages[i].id === pageId) {
            pages[i].classList.add("active");
        }
        else {
            pages[i].classList.remove("active");
        }

    }
}

let accountsList = [];
function my() {

    let accountNo = Number(document.querySelector("#acc").value);

    let name = document.querySelector("#nam").value;

    let accountType = document.querySelector("#accountType").value;
    let balance = Number(document.querySelector("#blc").value);

       if (accountNo === 0) {
            document.querySelector("#idNoEror").style.display="block";
            return;
        }
        if (name===""){
            document.querySelector("#nameEror").style.display="block";
            return;
        }

        if (balance===0) {
            document.querySelector("#blcEror").style.display="block";
            return;
        }


    for(let i=0;i<accountsList.length;i++){
        if(accountsList[i].accountNo===accountNo){
            alert("account already exited");
            return;
        }
    }

    let obj;
          if (accountType === 'SavingAccount') {
            obj = new SavingAccount(accountNo, name, 23, 'ABC', 'Saving', balance);
            Number(document.querySelector("#acc").value="");
            Number(document.querySelector("#blc").value="");
            document.querySelector("#nam").value="";
          }
          else if(accountType === 'CurrentAccount'){
             obj = new CurrentAccount(accountNo, name, 23, 'ABC', 'Current', balance);
          }
    accountsList.push(obj);

    document.querySelector("#acc").value = "";
    document.querySelector("#nam").value = "";
    document.querySelector("#blc").value = "";
}

class Bank{

}

class Customer extends Bank {

    static costomerId = 100;

    constructor(name, pin) {
        super();
        this.costomerIdCounter = ++Customer.costomerId;
        this.costomerName = name;
        this.pinCard = pin;
    }

    displayCostomerInfo() {
        console.log('Customer ID:', this.costomerIdCounter, 'Name:', this.costomerName);
    }
}

class accounts extends Customer {

    constructor(accountNo, name, pin, accountName, accountType, balance) {
        super(name, pin);
        this.accountNo = accountNo;
        this.accountName = accountName;
        this.accountType = accountType;
        this.balance = balance;
    }

    withdraw(amount) {

        if (amount <= 0) {
            alert("Invalid Amount");
            return;
        }

        if (amount > this.balance) {
            alert("Insufficient Balance");
            return;
        }

        this.balance -= amount;

        alert("Withdraw Successful");
        console.log("Remaining Balance:", this.balance);
    }

    deposit(amount) {

        if (amount <= 0) {
            alert("Invalid Amount");
            return;
        }

        alert(this.balance);

        this.balance += amount;

        alert(this.balance);
        alert("Deposit Successful");
    }
        transfer(receiver, amount) {

        this.balance -= amount;
        receiver.balance += amount;

    }
search() {

    document.querySelector("#showAccNo").innerText = this.accountNo;

    document.querySelector("#showCustomerId").innerText = this.costomerIdCounter;

    document.querySelector("#showName").innerText = this.costomerName;

    document.querySelector("#showType").innerText = this.accountType;

    document.querySelector("#showAccountName").innerText = this.accountName;

    document.querySelector("#showBalance").innerText = "₹" + this.balance;

    document.querySelector("#accountDetails").style.display = "block";
    }
showAllAcc() {

    let card = document.querySelector("#accountCard").cloneNode(true);

    card.removeAttribute("id");

    card.style.display = "block";

    card.querySelector(".allShowAccNo").innerText = this.accountNo;

    card.querySelector("#showAllCustomerId").innerText = this.costomerIdCounter;

    card.querySelector("#showAllName").innerText = this.costomerName;

    card.querySelector("#AllType").innerText = this.accountType;

    card.querySelector("#showAllAccountName").innerText = this.accountName;

    card.querySelector("#showAllBlc").innerText = "₹" + this.balance;

    let elements = card.querySelectorAll("[id]");

    for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute("id");
    }

    document.querySelector("#AllaccountsList").appendChild(card);
    } 
    Ring(){
              let sound = new Audio("./audio/MoneySound.mp3");
              sound.play();
    }
}

class SavingAccount extends accounts {

    constructor(accountNo, name, pin, accountName, accountType, balance) {
        super(accountNo, name, pin, accountName, accountType, balance);
        this.withdrawLimit = 10000;
    }

 

        withdraw(amount){
            if (amount<=0) {
                alert("THIS IS NOT A JOKE")
            }
            if (amount>=this.balance) {
            alert("Insufficient Balance");
              return;
            }
             this.remen = ( this.balance - amount);
            alert(this.remen);
            document.querySelector("#overdraftDetails").style.display = "none";
            this.balance -= amount;
           alert("Withdraw Successful");
          
               document.querySelector("#whitAccNo").innerText = this.accountNo;

             document.querySelector("#Whitcust").innerText = this.costomerIdCounter;

            document.querySelector("#WhitName").innerText = this.costomerName;

            document.querySelector("#whitType").innerText = this.accountType;

            document.querySelector("#withAmt").innerText = amount;

             document.querySelector("#REMENINGAmt").innerText = "₹" + this.balance;
             document.querySelector("#withDetails").style.display = "block";
             super.Ring();
        }
        deposit(amount){
                if (amount<=0) {
                    alert("THIS IS NOT A JOKE SIR");
                    return;
                }
                this.balance+=amount;
                document.querySelector("#depositAccNo").innerText = this.accountNo;

                document.querySelector("#depositCustomerId").innerText = this.costomerIdCounter;
                document.querySelector("#depositacctype").innerText = this.accountType;
                document.querySelector("#depositCustomerName").innerText = this.costomerName;
                document.querySelector("#depositamount").innerText = "  " + amount;
                document.querySelector("#depositTotal").innerText = " " +this.balance;
                document.querySelector("#Previousbncl").innerText = (this.balance-amount);
               // document.querySelector("depositAccNo").innerText = this.accountNo;
                document.querySelector("#depositOverdraftDetails").style.display = "none";

document.querySelector("#DEPOSITDetails").style.display = "block";
        super.Ring();
        }
        search(){
            super.search();
        }
        showAllAcc(){
            super.showAllAcc()
        }

}
class CurrentAccount extends accounts {

    constructor(accountNo, name, pin, accountName, accountType, balance) {
        super(accountNo, name, pin, accountName, accountType, balance);
        this.overdraftLimit = 5000;
        this.overDrowAdjust=0;
    }

   
        withdraw(amount){
      
            this.flag = false;
            if (amount<=0) {
                alert("THIS IS NOT A JOKE");
                return;
            }
            if (this.balance<amount) {
                alert("Insufficient Balance!\n\nIf you want, you can use the overdraft facility.\nYour overdraft limit is ₹5,000.\n\nIf you use the overdraft facility, the overdraft amount will be automatically deducted from your future deposits, along with 2% interest.");
                    if((amount - this.balance) > (this.overdraftLimit - this.overDrowAdjust)){
                        alert("SORRY SIR BUT LIMLIT IS ONLY"+this.overdraftLimit)
                        return;
                    } 
               let choice = confirm("Do you want to use the overdraft facility?");
                if (choice) {
                   
                    this.overDrowAdjust+=(amount-this.balance);
                    this.balance=0;
                    
                    this.overDrowLimit=this.overdraftLimit-this.overDrowAdjust;
                    alert("you depossite using overDrowLimit : "+ this.overDrowAdjust);
                    alert("now you have money take from  overDrowLimit :" + this.overDrowLimit);
                    this.flag = true;
                       
                         document.querySelector("#totalOverdraft").innerText = this.overdraftLimit;

                       document.querySelector("#usedOverdraft").innerText = this.overDrowAdjust;

                        document.querySelector("#remainingOverdraft").innerText = this.overDrowLimit;

                        document.querySelector("#totalRepayment").innerText =
                this.overDrowAdjust + (this.overDrowAdjust * 2 / 100);
                 document.querySelector("#overdraftDetails").style.display="flex"
                 super.Ring();
                }  
                    else {
                       alert("You selected No");
                      return;
                 }
            }
            else if(!this.flag) {
                this.balance-=amount;
                document.querySelector("#overdraftDetails").style.display = "none";
            }
              document.querySelector("#whitAccNo").innerText = this.accountNo;

             document.querySelector("#Whitcust").innerText = this.costomerIdCounter;

            document.querySelector("#WhitName").innerText = this.costomerName;

            document.querySelector("#whitType").innerText = this.accountType;

            document.querySelector("#withAmt").innerText = amount;
            document.querySelector("#REMENINGAmt").innerText = "₹" + this.balance;
            document.querySelector("#withDetails").style.display = "block";
                super.Ring();

        
        }
 deposit(amount) {

    if (amount <= 0) {
        alert("PLEASE SIR");
        return;
    }

    let previousBalance = this.balance;
    let oldOverdraft = this.overDrowAdjust;
    let totalDue = oldOverdraft * 1.02;

    let deducted = 0;
    let added = amount;

    if (this.overDrowAdjust > 0) {

        if (amount >= totalDue) {

            deducted = totalDue;
            added = amount - totalDue;

            this.balance += added;
            this.overDrowAdjust = 0;

        } else {

            deducted = amount;
            added = 0;

            this.overDrowAdjust = (totalDue - amount) / 1.02;
        }

        this.overDrowLimit = this.overdraftLimit - this.overDrowAdjust;

    } else {

        this.balance += amount;
    }

    
    super.Ring();
    document.querySelector("#depositAccNo").innerText = this.accountNo;
    document.querySelector("#depositCustomerId").innerText = this.costomerIdCounter;
    document.querySelector("#depositacctype").innerText = this.accountType;
    document.querySelector("#depositCustomerName").innerText = this.costomerName;
    document.querySelector("#Previousbncl").innerText = "₹" + previousBalance;
    document.querySelector("#depositamount").innerText = "₹" + amount;
    document.querySelector("#depositTotal").innerText = "₹" + this.balance;



    if (oldOverdraft > 0) {

        document.querySelector("#depositOverdraftUsed").innerText = "₹" + oldOverdraft.toFixed(2);

        document.querySelector("#depositInterest").innerText = "₹" + (oldOverdraft * 0.02).toFixed(2);

        document.querySelector("#depositRepaymentDue").innerText = "₹" + totalDue.toFixed(2);

        document.querySelector("#depositDeducted").innerText = "₹" + deducted.toFixed(2);

        document.querySelector("#depositAdded").innerText = "₹" + added.toFixed(2);

        document.querySelector("#depositRemainingDue").innerText = "₹" + (totalDue - deducted).toFixed(2);

        document.querySelector("#depositOverdraftDetails").style.display = "block";
        document.querySelector("#DEPOSITDetails").style.display = "block";

    } else {

        document.querySelector("#depositOverdraftDetails").style.display = "none";
    }

    alert("Deposit Successful");
}
            search(){
            super.search();
        }
        showAllAcc(){
            super.showAllAcc();
        }

}
function WithDraw() {
    document.querySelector("#withDetails").style.display = "none";
    let accountNo = Number(document.querySelector("#withdrawAcc").value);
    let Amount = Number(document.querySelector("#withdrawAmount").value);

    for (let i = 0; i < accountsList.length; i++) {
        if (accountsList[i].accountNo === accountNo) {
            accountsList[i].withdraw(Amount);
            Number(document.querySelector("#withdrawAcc").value="");
            Number(document.querySelector("#withdrawAmount").value="");
            return;
        }
    }

    alert("Account Not Found");
  }

function Deposit() {

    let accountNo = Number(document.querySelector("#depositAcc").value);
    let Amount = Number(document.querySelector("#depositAmount").value);

    for (let i = 0; i < accountsList.length; i++) {

        if (accountsList[i].accountNo === accountNo) {

            accountsList[i].deposit(Amount);
            
            document.querySelector("#depositAcc").value = "";
            document.querySelector("#depositAmount").value = "";
            return;
        }
    }

    alert("Account Not Found");
}

function Search() {

    let detailsAcc = Number(document.querySelector("#detailsAcc").value);
    let accountDetails = document.querySelector("#accountDetails");
        accountDetails.style.display = "none";

   // document.querySelector("#accountDetails").style.display = "none";

    for (let i = 0; i < accountsList.length; i++) {

        if (accountsList[i].accountNo === detailsAcc) {

            accountsList[i].search();
            let detailsAcc = Number(document.querySelector("#detailsAcc").value="");

            return;
        }
    }

    alert("Account Not Found");
}

function AllSearch() {

    let accountTypeForAll = document.querySelector("#accountTypeForAll").value;

    let AllaccountsList = document.querySelector("#AllaccountsList");

    let cards = AllaccountsList.children;

    while (cards.length > 1) {
        cards[1].remove();
    }

    let count = 0;

    for (let i = 0; i < accountsList.length; i++) {

        if (accountsList[i].accountType === accountTypeForAll) {

            accountsList[i].showAllAcc();

            count++;
        }
    }

    if (count === 0) {
        alert("No Accounts Found");
    }

}

function Transfer() {

    let fromAcc = Number(document.querySelector("#fromAcc").value);
    let toAcc = Number(document.querySelector("#toAcc").value);
    let amount = Number(document.querySelector("#transferAmount").value);

    document.querySelector("#transferDetails").style.display = "none";

    if (fromAcc <= 0 || toAcc <= 0 || amount <= 0 ||
        !Number.isFinite(fromAcc) ||
        !Number.isFinite(toAcc) ||
        !Number.isFinite(amount)) {

        alert("Please Enter Valid Details");
        return;
    }

    if (fromAcc === toAcc) {
        alert("Sender And Receiver Account Cannot Be Same");
        return;
    }

    let sender = null;
    let receiver = null;

    for (let i = 0; i < accountsList.length; i++) {

        if (accountsList[i].accountNo === fromAcc) {
            sender = accountsList[i];
        }

        if (accountsList[i].accountNo === toAcc) {
            receiver = accountsList[i];
        }
    }

    if (sender === null) {
        alert("Sender Account Not Found");
        return;
    }

    if (receiver === null) {
        alert("Receiver Account Not Found");
        return;
    }

    if (sender.balance < amount) {
        alert("Insufficient Balance");
        return;
    }

    sender.transfer(receiver, amount);

    document.querySelector("#transferStatus").innerText =
        "₹" + amount + " Transferred Successfully From " +
        sender.costomerName + " To " + receiver.costomerName +
        "\nSender Remaining Balance: ₹" + sender.balance;

    document.querySelector("#transferDetails").style.display = "block";

    document.querySelector("#fromAcc").value = "";
    document.querySelector("#toAcc").value = "";
    document.querySelector("#transferAmount").value = "";
     



}