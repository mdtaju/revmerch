"use client";
import Image from 'next/legacy/image';
import { useState, useEffect } from 'react';
import { roboto } from '@/utils/fonts.config';
import { feedbackStar } from '@/utils/feedbackStars';
import Link from 'next/link';
import ColorSelectBtn from './Color';
import useAuthState from '../provider/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeCartItem } from '@/lib/features/cart/cartSlice';

let selectedMark = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_131_525)">
            <path d="M6 1.00116C5.0111 1.00116 4.0444 1.2944 3.22215 1.84381C2.39991 2.39322 1.75904 3.17411 1.3806 4.08774C1.00217 5.00137 0.90315 6.00671 1.09608 6.97661C1.289 7.94652 1.76521 8.83743 2.46447 9.53669C3.16373 10.236 4.05465 10.7122 5.02455 10.9051C5.99446 11.098 6.99979 10.999 7.91342 10.6206C8.82705 10.2421 9.60794 9.60126 10.1573 8.77901C10.7068 7.95677 11 6.99007 11 6.00116C11 5.34455 10.8707 4.69437 10.6194 4.08774C10.3681 3.48111 9.99983 2.92992 9.53554 2.46563C9.07124 2.00133 8.52005 1.63304 7.91342 1.38176C7.30679 1.13049 6.65661 1.00116 6 1.00116ZM8.15 4.80616L5.865 7.80616C5.81842 7.86667 5.75861 7.9157 5.69013 7.9495C5.62166 7.98331 5.54636 8.00098 5.47 8.00116C5.39406 8.00157 5.31901 7.98467 5.25057 7.95175C5.18213 7.91883 5.12209 7.87075 5.075 7.81116L3.855 6.25616C3.81462 6.20429 3.78485 6.14497 3.76739 6.08159C3.74994 6.01822 3.74513 5.95202 3.75326 5.88679C3.76138 5.82155 3.78228 5.75856 3.81475 5.7014C3.84722 5.64424 3.89063 5.59404 3.9425 5.55366C4.04726 5.47211 4.18013 5.43551 4.31187 5.45192C4.37711 5.46004 4.4401 5.48094 4.49726 5.51341C4.55442 5.54588 4.60462 5.58929 4.645 5.64116L5.46 6.68116L7.35 4.18116C7.39006 4.12863 7.44006 4.08451 7.49717 4.0513C7.55428 4.0181 7.61736 3.99647 7.68283 3.98765C7.74829 3.97883 7.81485 3.98299 7.87871 3.99989C7.94257 4.01679 8.00247 4.04611 8.055 4.08616C8.10753 4.12621 8.15166 4.17622 8.18486 4.23333C8.21806 4.29043 8.23969 4.35352 8.24851 4.41898C8.25733 4.48445 8.25317 4.55101 8.23627 4.61487C8.21937 4.67873 8.19006 4.73863 8.15 4.79116V4.80616Z" fill="white" />
      </g>
      <defs>
            <clipPath id="clip0_131_525">
                  <rect width="12" height="12" fill="white" transform="translate(0 0.00115967)" />
            </clipPath>
      </defs>
</svg>

// component start
const ProductCard = ({ product }) => {
      const { id = "01", name = "Product Name", price = "1199", feedback = 4.5, reviews = "32", colors = [], type = "", images = [] } = product;
      const [isAddedToCart, setIsAddedToCart] = useState(false);
      const [selectedColor, setSelectedColor] = useState("");
      const [allColors, setAllColors] = useState(colors.slice(0, 6));
      const [showMoreColors, setShowMoreColors] = useState(false);
      const cartItems = useSelector(state => state.cart.cartArray);
      const [loading, setLoading] = useState(false);
      const dispatch = useDispatch();
      const authUser = useAuthState();
      const feedbackCal = feedbackStar(feedback);

      useEffect(() => {
            if (cartItems) {
                  const getItem = cartItems.find((item) => item.product_id === id);
                  if (getItem) {
                        setIsAddedToCart(getItem.id);
                  } else {
                        setIsAddedToCart(false);
                  }
            }
      }, [cartItems, id]);

      const regexEmoji =
            /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}!@#$%^&*()_+={}[\]:;<>,.?/~`\\/-]/gu; // for emoji and special characters
      const filterName = product.name.replace(regexEmoji, "");
      const removeExtraSpaces = filterName.trim().replace(/\s+/g, " ");
      const makingNameUrl = removeExtraSpaces.toLowerCase().replaceAll(" ", "-");

      function handleAddToCart() {
            if (!authUser) {
                  return alert("To add product to cart. Please, log in to your account first.")
            }
            setLoading(true)
            if (isAddedToCart) {
                  dispatch(removeCartItem(isAddedToCart)).then(() => {
                        setIsAddedToCart(false);
                        setLoading(false);
                  }).catch(() => {
                        setLoading(true);
                  })
            } else {
                  dispatch(addToCart({
                        product_id: id,
                        color: selectedColor,
                        user_id: authUser.uid,
                        quantity: 1,
                        product_price: price,
                        total_price: price,
                        product_name: name,
                        product_image: images[0],
                        size: "",
                  })).then((data) => {
                        setIsAddedToCart(data.payload.id);
                        setLoading(false);
                  }).catch(() => {
                        setLoading(false);
                  })
            }
      }

      function handleColorSelect(color) {
            setSelectedColor(color);
      }

      function handleShowMoreColors() {
            setShowMoreColors((prevState) => {
                  if (showMoreColors) {
                        setAllColors(colors.slice(0, 6));
                  } else {
                        setAllColors(colors);
                  }
                  return !prevState
            });
      }

      return (
            <div className={`w-[238px] h-auto bg-white rounded-[19px] ${roboto.className} hover:scale-[1.02] common_transition flex flex-col`}>
                  {/* image container */}
                  <div className='w-full h-[238px] relative p-1'>
                        {/* image */}
                        <Link href={`/products/${makingNameUrl}-${id}`}>
                              <Image
                                    src={images[0]}
                                    alt={name}
                                    layout='fill'
                                    className='absolute w-full h-full object-contain object-center cursor-pointer'
                              />
                        </Link>
                        {/* tag & add */}
                        {
                              type.toLowerCase() === "new" &&
                              <span className='py-1 px-2 uppercase bg-primary absolute w-fit top-2 left-2 z-[3] text-sm rounded-sm'>New</span>
                        }
                        {/* add to cart */}
                        <button disabled={loading} onClick={handleAddToCart} className={`p-3 bg-[#F3F3F3] rounded-full absolute top-2 right-2 z-[3] ${loading ? "animate-pulse" : ""}`} aria-label='cart-btn'>
                              {
                                    isAddedToCart ?
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 20 20" fill="#DA0037" >
                                                <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                                          </svg> :
                                          <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.00288 12.25L8.00289 12.25L7.99711 12.25C7.9642 12.2502 7.93159 12.2439 7.90113 12.2315C7.87093 12.2191 7.84343 12.201 7.82019 12.1781C7.81999 12.1779 7.8198 12.1777 7.8196 12.1775L1.99538 6.3458C1.99514 6.34555 1.99489 6.3453 1.99464 6.34506C1.35677 5.70013 0.998993 4.82963 0.998993 3.92251C0.998993 3.0156 1.35661 2.14529 1.99421 1.50041C2.63707 0.859977 3.50753 0.500366 4.415 0.500366C5.32293 0.500366 6.19383 0.860349 6.83678 1.5014C6.83683 1.50146 6.83689 1.50151 6.83694 1.50157L7.64644 2.31107L8 2.66462L8.35355 2.31107L9.16305 1.50157C9.16312 1.5015 9.16319 1.50143 9.16325 1.50136C9.8062 0.860334 10.6771 0.500366 11.585 0.500366C12.4925 0.500366 13.3629 0.859976 14.0058 1.50041C14.6434 2.14529 15.001 3.0156 15.001 3.92251C15.001 4.82958 14.6433 5.70004 14.0054 6.34496C14.0052 6.34524 14.0049 6.34552 14.0046 6.3458L8.18039 12.1775C8.18018 12.1777 8.17998 12.1779 8.17978 12.1781C8.15654 12.201 8.12905 12.2191 8.09887 12.2315C8.0684 12.2439 8.03579 12.2502 8.00288 12.25ZM2.35101 1.85189L2.35052 1.85239C1.80436 2.40142 1.49777 3.14435 1.49777 3.91876C1.49777 4.69318 1.80436 5.4361 2.35051 5.98514L2.35119 5.98582L7.64619 11.2883L8 11.6426L8.3538 11.2883L13.6488 5.98582L13.6495 5.98514C14.1956 5.4361 14.5022 4.69318 14.5022 3.91876C14.5022 3.14434 14.1956 2.40142 13.6495 1.85239L13.644 1.84689L13.6384 1.84156C13.0833 1.31715 12.3486 1.02498 11.585 1.02498C10.8214 1.02498 10.0867 1.31715 9.53162 1.84156L9.52596 1.84692L9.52046 1.85245L8.17796 3.20244L8.1775 3.20291C8.15425 3.22634 8.1266 3.24494 8.09614 3.25764C8.06568 3.27033 8.033 3.27686 8 3.27686C7.96699 3.27686 7.93431 3.27033 7.90385 3.25763C7.87339 3.24494 7.84574 3.22635 7.8225 3.20291L7.82203 3.20245L6.47953 1.85244L6.47898 1.85189C6.20804 1.58029 5.8859 1.36514 5.53122 1.21891C5.17724 1.07297 4.79786 0.998574 4.415 1.00001C4.03213 0.998574 3.65276 1.07297 3.29877 1.21891C2.94409 1.36514 2.62195 1.58029 2.35101 1.85189Z" fill={`#1C1C1C`} stroke={`#1C1C1C`} />
                                          </svg>
                              }
                        </button>
                  </div>
                  {/* content area */}
                  <div className='py-2 px-3 text-left space-y-1 text-[#1C1C1C] flex flex-col justify-between flex-1'>
                        {/* colors */}
                        <div className='flex flex-wrap gap-1 items-center justify-between'>
                              {
                                    allColors.map((color, i) => (
                                          <ColorSelectBtn
                                                key={i}
                                                productColor={color}
                                                selectedColor={selectedColor}
                                                onClick={() => handleColorSelect(color.color)}
                                          />
                                    ))
                              }
                              {/* <button key={i} onClick={() => handleColorSelect(product.name)} aria-label={`${product.name}_color`} className={`w-[28px] h-[28px] rounded-full grid place-items-center hover:brightness-110 common_transition`} style={{ background: product.color }} >
                                                {
                                                      selectedColor === product.name && selectedMark
                                                }
                                          </button> */}
                        </div>
                        {
                              showMoreColors ?
                                    <p onClick={handleShowMoreColors} className='text-xs cursor-pointer underline w-fit'>less color</p> :
                                    <p onClick={handleShowMoreColors} className='text-xs cursor-pointer underline w-fit'>+4 Colors</p>

                        }
                        <div>
                              <p className='text-[#979797] text-[10px]'>brand/category</p>
                              <Link href={`/products/${makingNameUrl}-${id}`}>
                                    <h2 className='text-2xl mb-0 hover:underline cursor-pointer line-clamp-2'>{name}</h2>
                              </Link>
                        </div>
                        {/* bottom area */}
                        <div>
                              {/* feedback */}
                              {/* <div className='flex items-center gap-2'>
                                    <div className='flex items-center gap-1'>
                                          {
                                                feedbackCal.feedbackArr.map((item, i) => (
                                                      <svg key={i} width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.7298 12.5017L10.7172 12.5011L10.7047 12.5012C10.6785 12.5013 10.6527 12.4952 10.6293 12.4835L7.23193 10.7049L7.00002 10.5835L6.76812 10.7049L3.36812 12.4849L3.36732 12.4853C3.33971 12.4998 3.30859 12.5063 3.2775 12.504L3.24074 13.0027L3.27749 12.504C3.2464 12.5017 3.21657 12.4908 3.19139 12.4723L2.89631 12.876L3.19139 12.4723C3.16622 12.4539 3.14671 12.4288 3.13509 12.3999C3.12347 12.371 3.1202 12.3394 3.12565 12.3086L3.12565 12.3086L3.79232 8.5553L3.83873 8.29399L3.64832 8.10912L0.904942 5.44565C0.884361 5.42455 0.869737 5.39835 0.862581 5.36972C0.85562 5.34188 0.855974 5.31273 0.863569 5.28511C0.873513 5.2573 0.89068 5.2326 0.913343 5.21358C0.937204 5.19355 0.966204 5.1806 0.997053 5.17622L0.998739 5.17598L4.79874 4.62264L5.05985 4.58462L5.17581 4.34761L6.84915 0.927607L6.84915 0.927609L6.85003 0.925805C6.86367 0.897626 6.88498 0.873862 6.91151 0.857234C6.93804 0.840606 6.96872 0.831787 7.00002 0.831787C7.03133 0.831787 7.06201 0.840606 7.08854 0.857234L7.35408 0.433576L7.08854 0.857235C7.11507 0.873862 7.13638 0.897626 7.15002 0.925805L7.15 0.925815L7.15211 0.930066L8.84545 4.3434L8.96193 4.57821L9.22131 4.61598L13.0213 5.16931L13.023 5.16955C13.0538 5.17394 13.0828 5.18688 13.1067 5.20691L13.4282 4.82397L13.1067 5.20691C13.1294 5.22594 13.1465 5.25063 13.1565 5.27844C13.1641 5.30606 13.1644 5.33521 13.1575 5.36305C13.1503 5.39167 13.1357 5.41786 13.1151 5.43897L10.3717 8.10245L10.1813 8.28733L10.2277 8.54864L10.8944 12.302L10.8944 12.302L10.8955 12.3081C10.9015 12.3393 10.8984 12.3716 10.8865 12.4011C10.875 12.4299 10.8558 12.4548 10.8309 12.4732C10.8012 12.4934 10.7657 12.5034 10.7298 12.5017Z" fill="#DA0037" stroke="#DA0037" />
                                                      </svg>
                                                ))
                                          }
                                          {
                                                feedbackCal.isInt ? <></> :
                                                      <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.78979 0.594663L6.78977 0.594673L6.79187 0.598922L8.48459 4.01101L8.60108 4.24582L8.86046 4.28359L12.6591 4.83673L12.6608 4.83697C12.6916 4.84134 12.7205 4.85427 12.7443 4.87427C12.767 4.89327 12.7841 4.91793 12.794 4.9457C12.8016 4.97328 12.802 5.00237 12.795 5.03017C12.7879 5.05875 12.7733 5.0849 12.7528 5.10597L10.0104 7.76849L9.81994 7.95336L9.86636 8.21467L10.5328 11.9666L10.5327 11.9666L10.5339 11.9727C10.5398 12.0039 10.5367 12.0362 10.5249 12.0657C10.5135 12.0943 10.4942 12.1193 10.4694 12.1376C10.4397 12.1578 10.4043 12.1678 10.3684 12.1661L10.3559 12.1655L10.3433 12.1656C10.3172 12.1657 10.2914 12.1596 10.268 12.1479L6.89615 10.3826L6.89617 10.3826L6.88975 10.3793L6.86551 10.3671L6.63596 10.2511L6.4081 10.3704L3.00933 12.1497L3.00853 12.1502C2.98097 12.1647 2.94989 12.1711 2.91884 12.1688C2.88779 12.1666 2.858 12.1556 2.83286 12.1372L2.53778 12.5409L2.83286 12.1372C2.80772 12.1188 2.78824 12.0938 2.77664 12.0649C2.76504 12.036 2.76177 12.0044 2.76722 11.9738L2.76722 11.9737L3.43364 8.22178L3.48006 7.96047L3.28964 7.7756L0.547261 5.11309C0.526714 5.09202 0.512114 5.06586 0.504969 5.03728C0.498019 5.00948 0.498371 4.98038 0.505954 4.9528C0.515883 4.92503 0.533024 4.90037 0.555653 4.88138L0.235442 4.49995L0.555654 4.88137C0.57948 4.86137 0.608436 4.84845 0.63924 4.84407L0.640927 4.84383L4.43954 4.29069L4.70065 4.25267L4.81662 4.01566L6.48935 0.596904L6.48935 0.596905L6.49022 0.595103C6.50385 0.566963 6.52513 0.543234 6.55162 0.526631L6.28798 0.106018L6.55162 0.526631C6.57811 0.510027 6.60874 0.501221 6.64 0.501221L6.64606 0.501331C6.67647 0.502437 6.70467 0.511324 6.72839 0.52619C6.75488 0.542793 6.77616 0.566523 6.78979 0.594663ZM6.16424 9.39997V9.89287L6.6571 9.89992C6.67528 9.90018 6.69315 9.90481 6.70917 9.91347L6.71224 9.9151L9.22466 11.2479L10.1233 11.7247L9.95182 10.722L9.472 7.91632L9.47177 7.915C9.46712 7.88825 9.46909 7.86077 9.4775 7.83495C9.48591 7.80913 9.50051 7.78576 9.52003 7.76689L9.52177 7.76519L11.521 5.81257L12.2429 5.10758L11.2447 4.96023L8.46292 4.54959C8.44047 4.54383 8.41943 4.53344 8.40117 4.51904C8.38065 4.50285 8.36422 4.48205 8.35323 4.45832L8.34976 4.45083L8.34604 4.44345L7.11074 1.99245L6.16424 2.21749V9.39997Z" fill="#DA0037" stroke="#DA0037" />
                                                      </svg>

                                          }
                                    </div>
                                    <span>{reviews}+</span>
                              </div> */}
                              {/* price */}
                              <h3 className='text-lg font-medium'>${price}</h3>
                        </div>
                  </div>
            </div>
      );
};

export default ProductCard;