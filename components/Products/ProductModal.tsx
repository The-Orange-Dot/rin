import {
  Modal,
  Paper,
  Fade,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  styled,
  CircularProgress,
} from "@mui/material";

import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ProductType, ProductReviewType } from "../../types/productTypes";
import { useRouter } from "next/router";
import IngredientsAccordion from "./IngredientsAccordion";
import ProductReviews from "./ProductReviews";
import CheckoutButton from "./CheckoutButton";
import InstructionsAccordion from "./InstructionsAccordion";
import Image from "next/image";
import gsap from "gsap";
import styles from "./styles/ProductModal.module.scss";

interface PoductModalType {
  productModalOpen: boolean;
  setProductModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedProduct: ProductType;
}

const ProductModal = ({
  productModalOpen,
  setProductModalOpen,
  selectedProduct,
}: PoductModalType) => {
  const [product, setProduct] = useState({});
  const [description, setDescription] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const [numberOfReviews, setNumberOfreviews] = useState<number>(3);
  const [loadMoreReviews, setLoadMoreReviews] = useState(false);
  const [options, setOptions] = useState("");
  const [reviewsData, setReviewsData] = useState<ProductReviewType[]>([]);
  const [imageNum, setImageNum] = useState(0);
  const [instructions, setInstructions] = useState<ReactElement[]>([]);

  //Sets description from selected product
  useEffect(() => {
    setProduct(selectedProduct);
    setLoadMoreReviews(false);
    setReviewsData(selectedProduct.reviews);
    setNumberOfreviews(3);
    if (selectedProduct.name !== "") {
      setProductModalOpen(true);
    } else {
      setProductModalOpen(false);
      setImageNum(0);
    }
  }, [selectedProduct]); //eslint-disable-line

  //Maps through product description to render
  useEffect(() => {
    if (selectedProduct?.description?.length > 0) {
      const productDescriptionArray = selectedProduct?.description?.map(
        (text: string) => {
          return (
            <Typography key={text.length} variant="caption" fontSize=".85rem">
              {text}
            </Typography>
          );
        }
      );
      setDescription(productDescriptionArray);
    }

    if (selectedProduct?.instructions?.length > 0) {
      const instructions = selectedProduct.instructions.map(
        (instruction, i) => {
          const index = i + 1;
          return (
            <Typography key={i}>
              {index}. {instruction}
            </Typography>
          );
        }
      );

      setInstructions(instructions);
    }
  }, [selectedProduct]);

  //Disables back button if modal is open
  useEffect(() => {
    router.beforePopState(({ url }) => {
      closeModalHandler(url);
      return true;
    });
  }, []); //eslint-disable-line

  const closeModalHandler = (url: string) => {
    if (document.querySelector("#product-modal")) {
      gsap.to("#product-modal", {
        opacity: 0,
        //@ts-ignore
        onComplete: backButtonOverride,
        onCompleteParams: [url],
      });
    }
  };

  //Logic for closing modal and setting modal_open to false
  const backButtonOverride = async (url: string) => {
    setProductModalOpen(false);

    if (productModalOpen) {
      await router.replace(
        {
          pathname: "/products",
        },
        {},
        { scroll: false, shallow: true }
      );

      setQuantity(1);
      setDescription([]);
    }
  };

  const fetchMoreReviews = async () => {
    setLoadMoreReviews(true);
    const res = await fetch(`/api/productReviews/${selectedProduct.id}`, {
      method: "PATCH",
      body: JSON.stringify(numberOfReviews),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reviews: any[] = await res.json();

    setNumberOfreviews(numberOfReviews + 5);
    setReviewsData([...reviewsData, ...reviews]);
    setLoadMoreReviews(false);
  };

  const reviews = reviewsData?.map((review: ProductReviewType) => {
    return <ProductReviews review={review} key={review.createdAt} />;
  });

  const changeImageHandler = (i: number) => {
    if (i !== imageNum) {
      gsap
        .timeline()
        .to("#product-image", {
          opacity: 0,
          duration: 0.2,
          //@ts-ignore
          onComplete: setImageNum,
          onCompleteParams: [i],
        })
        .to("#product-image", {
          opacity: 1,
          duration: 0.2,
          delay: 0.2,
        });
    }
  };

  const imagesArray = selectedProduct.images.map((image: string, i: number) => {
    return (
      <Box
        className={styles.selector_images}
        key={image}
        onClick={() => {
          changeImageHandler(i);
        }}
      >
        <Image
          src={image}
          alt={i.toString()}
          width={50}
          height={50}
          objectFit="contain"
          quality={25}
          loading="lazy"
          blurDataURL={image}
          placeholder="blur"
        />
      </Box>
    );
  });

  return (
    <Modal
      open={productModalOpen}
      onClose={() => {
        setProductModalOpen(false);
      }}
      className={styles.modal}
      hideBackdrop
      id="product-modal"
    >
      <Fade in={productModalOpen}>
        <Paper square elevation={0} className={styles.container}>
          {/* Left side */}
          <Box className={styles.images_container}>
            <Box className={styles.display_image}>
              {productModalOpen && selectedProduct.images.length ? (
                <Image
                  src={selectedProduct.images[imageNum]}
                  alt={selectedProduct.name}
                  layout="fill"
                  objectFit="contain"
                  unoptimized={true}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={selectedProduct.thumbnail}
                  quality="100"
                  id="product-image"
                />
              ) : null}
            </Box>

            <Box className={styles.selector_image_container}>{imagesArray}</Box>

            <Box className={styles.checkout_button_container}>
              <CheckoutButton
                selectedProduct={selectedProduct}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </Box>
          </Box>

          {/* Right Side */}
          <Box className={styles.content_container}>
            <Box className={styles.title_container}>
              <Typography variant="h4" fontWeight={600} color="primary">
                {selectedProduct.name}
              </Typography>
              <Typography variant="caption">by</Typography>
              <Typography variant="overline">
                {selectedProduct.brand}
              </Typography>
              <Box>
                <Typography variant="body1" color="secondary" fontWeight={200}>
                  {selectedProduct.size}
                  {selectedProduct.details
                    ? ` - ${selectedProduct.details}`
                    : ""}
                </Typography>

                <Box className={styles.divider}>
                  <Divider />
                </Box>

                <Box className={styles.what_is_it}>
                  <Typography fontWeight={600}>What it is:</Typography>
                  <Box className={styles.description_container}>
                    {description}
                  </Box>
                </Box>
                <Divider />

                <InstructionsAccordion product={product} />
                <Divider />
                <IngredientsAccordion product={product} />

                <Divider />

                <Box>
                  <Typography>
                    {selectedProduct?._count?.reviews} Reviews
                  </Typography>
                  <Box>
                    <Typography>Voted most helpful review</Typography>
                    {reviews}
                  </Box>
                </Box>

                {numberOfReviews <= selectedProduct?._count?.reviews ? (
                  <Button
                    disabled={loadMoreReviews}
                    onClick={() => {
                      fetchMoreReviews();
                    }}
                  >
                    {loadMoreReviews ? (
                      <CircularProgress color="inherit" size={25} />
                    ) : (
                      "See more reviews"
                    )}
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ProductModal;
