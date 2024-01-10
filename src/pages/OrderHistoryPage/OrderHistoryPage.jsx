import {checkToken} from '../../utilities/users-services';
import styles from './OrderHistoryPage.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ordersAPI from '../../utilities/orders-api';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrderList from '../../components/OrderList/OrderList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
// function OrderHistoryPage() {
//   const handleCheckToken = async () => {
//     try {
//       const expDate = await checkToken()
//       console.log(expDate)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   return (
//     <div>
//       <h1>OrderHistoryPage</h1>
//       <button onClick={handleCheckToken}>Check Log In Expiration</button>
//     </div>
//   )
// }

// export default OrderHistoryPage

export default function OrderHistoryPage({ user, setUser }) {
  /*--- State --- */
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  /*--- Side Effects --- */
  useEffect(function () {
    // Load previous orders (paid)
    async function fetchOrderHistory() {
      const orders = await ordersAPI.getOrderHistory();
      setOrders(orders);
      // If no orders, activeOrder will be set to null below
      setActiveOrder(orders[0] || null);
    }
    fetchOrderHistory();
  }, []);

  /*--- Event Handlers --- */
  function handleSelectOrder(order) {
    setActiveOrder(order);
  }

  /*--- Rendered UI --- */
  return (
    <main className={styles.OrderHistoryPage}>
      <aside className={styles.aside}>
        <Logo />
        <Link to="/orders/new" className="button btn-sm">
          NEW ORDER
        </Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <OrderList
        orders={orders}
        activeOrder={activeOrder}
        handleSelectOrder={handleSelectOrder}
      />
      <OrderDetail order={activeOrder} />
    </main>
  );
}