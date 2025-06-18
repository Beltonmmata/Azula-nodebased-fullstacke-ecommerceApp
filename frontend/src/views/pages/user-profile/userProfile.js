import localStorageObj from "../../../models/local-storage";
import footer from "../../components/footer/footer";
import mainHeader from "../../components/main-header/mainHeader";
import newsletter from "../../components/newsletter/newsletter";
import "./userProfile.css";
const userProfile = {
  render() {
    const user = localStorageObj.getItem("user");
    const { createdAt, email, id, isAdmin, name } = user;
    return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
      
      <section class="user-profile-container">
      
         <!-- container -->
      
        <div class="profile-overview">
          <div class="profile">
            <div class="profile-picture">
              <img src="/utils/testing-profile-pic.png" alt="profile picture" />
            </div>
            <div class="profile-information">
              <div class="profile-text xl-font">${name}</div>
              <div class="l-font profile-email">${email}</div>
            </div>
          </div>
          <h3 class="section-subtitle">Profile Overview</h3>
          <ul>
            <li>
              <div class="label">Promo Code:</div>
              <div class="for">belton1</div>
            </li>
            <li>
              <div class="label">Refarals:</div>
              <div class="for">3</div>
            </li>
            <li>
              <div class="label">Promo Points:</div>
              <div class="for">33</div>
            </li>
            <li>
              <div class="label">Promo Points:</div>
              <div class="for">33</div>
            </li>
            <li>
              <button class="btn w-full primary-btn">Reset Password</button>
            </li>
            <li>
              <button class="btn w-full primary-btn">Update Profile</button>
            </li>
            <li>
              <button class="btn w-full primary-btn">Delete Account</button>
            </li>
          </ul>
        </div>
        <div class="summary-overview">
          <div class="your-orders">
            <h2>My Orders</h2>
            <div class="content">
              <table>
                <thead>
                  <tr>
                    <th>OrderId</th>
                    <th>TotalItems</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OrdedeffrId</td>
                    <td>8</td>
                    <td>6666</td>
                    <td>Incomplete</td>
                    <td>Canceled</td>
                    <td>
                      <button class="btn w-full primary-btn">Action</button>
                    </td>
                  </tr>
                  <tr>
                    <td>OrdedeffrId</td>
                    <td>8</td>
                    <td>6666</td>
                    <td>Incomplete</td>
                    <td>Canceled</td>
                    <td>
                      <button class="btn w-full primary-btn">Action</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
     


      </section>
      <section id='newsletter-section'>
          ${newsletter.render()}
      </section>
      
    </main>
    <footer>
       ${footer.render()}
    </footer>
    `;
  },
  afterRender() {
    mainHeader.afterRender();
  },
};

export default userProfile;
