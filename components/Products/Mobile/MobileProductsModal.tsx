import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  ReactElement,
} from "react";
import {
  Modal,
  Fade,
  Paper,
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import MobileCheckoutButton from "./MobileCheckoutButton";
import { ProductReviewType, ProductType } from "../../../types/productTypes";
import MobileIngredientsAccordion from "./MobileIngredientsAccordion";
import MobileProductReview from "./MobileProductReview";
import Image from "next/image";
import gsap from "gsap";
import MobileInstructionsAccordion from "./MobileInstructionsAccordion";
import styles from "../styles/ProductModal.module.scss";

interface PoductModalType {
  productModalOpen: boolean;
  setProductModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedProduct: ProductType;
}

const MobileProductsModal = ({
  productModalOpen,
  setProductModalOpen,
  selectedProduct,
}: PoductModalType) => {
  const [product, setProduct] = useState<ProductType>(selectedProduct);
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<any[]>([]);
  const [options, setOptions] = useState("");
  const router = useRouter();
  const [loadMoreReviews, setLoadMoreReviews] = useState(false);
  const [reviewsData, setReviewsData] = useState(selectedProduct?.reviews);
  const [numberOfReviews, setNumberOfreviews] = useState<number>(3);
  const [imageNum, setImageNum] = useState(0);
  const [instructions, setInstructions] = useState<ReactElement[]>([]);

  useEffect(() => {
    setLoadMoreReviews(false);
    setProduct(selectedProduct);
    setNumberOfreviews(3);
    setReviewsData(selectedProduct?.reviews);
    if (selectedProduct.name !== "") {
      setProductModalOpen(true);
    } else {
      setProductModalOpen(false);
      setImageNum(0);
    }
  }, [selectedProduct]); //eslint-disable-line

  useEffect(() => {
    if (product?.description?.length > 0) {
      const productDescriptionArray = product?.description?.map(
        (text: string) => {
          return (
            <Typography key={text.length} variant="caption">
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
  }, [product?.description]); //eslint-disable-line

  useEffect(() => {
    router.beforePopState(({ url }) => {
      closeModalHandler(url);
      return false;
    });
  }, []); //eslint-disable-line

  const closeModalHandler = (url: string) => {
    gsap.timeline().to("#mobile-product-modal", {
      opacity: 0,
      duration: 0.2,
      //@ts-ignore
      onComplete: backButtonOverride,
      onCompleteParams: [url],
    });
  };

  const backButtonOverride = async (url: string) => {
    setProductModalOpen(false);

    if (productModalOpen) {
      await router.replace(
        {
          pathname: "/products",
        },
        {},
        { scroll: false }
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
    return <MobileProductReview review={review} key={review.createdAt} />;
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
          alt={image}
          width={50}
          height={50}
          objectFit="contain"
          quality={25}
          unoptimized
        />
      </Box>
    );
  });

  return (
    <Modal
      open={productModalOpen}
      className={styles.modal}
      hideBackdrop
      id="mobile-product-modal"
    >
      <Fade in={productModalOpen} timeout={500}>
        <Paper square className={styles.container}>
          <Box className={styles.content_container}>
            {
              /*eslint-disable*/
              <img
                alt={product.name}
                src={product.images[imageNum]}
                width={300}
                height={300}
                id="product-image"
              />
              /*eslint-enable*/
            }
            <Box className={styles.selector_image_container}>{imagesArray}</Box>
            <Box className={styles.title_container}>
              <Typography
                color="secondary"
                variant="overline"
                fontSize=".7rem"
                lineHeight=".0rem"
              >
                {product.brand}
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {product.name}
              </Typography>
            </Box>
            <Box className={styles.subtitle_container}>
              <Typography variant="caption" color="secondary">
                {product.size}
              </Typography>
              {product.details ? (
                <Typography variant="caption" color="secondary">
                  - {product.details}
                </Typography>
              ) : null}
            </Box>
            <Box className={styles.what_is_it}>
              <Typography variant="body2" fontWeight={600}>
                What it is:
              </Typography>
              {description}
              <Divider />

              <MobileInstructionsAccordion product={product} />
              <Divider />

              <MobileIngredientsAccordion product={product} />
              <Divider />

              <Box className={styles.reviews_container}>
                <Typography variant="body1" fontWeight={600} fontSize="1.2rem">
                  {product?._count?.reviews} Reviews
                </Typography>
                <Typography>Top most helpful reviews</Typography>
                {reviews}
                {numberOfReviews <= selectedProduct?._count?.reviews ? (
                  <Button
                    disabled={loadMoreReviews}
                    className={styles.see_more_reviews_button}
                    onClick={() => fetchMoreReviews()}
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

          <MobileCheckoutButton
            closeModalHandler={closeModalHandler}
            quantity={quantity}
            setQuantity={setQuantity}
            options={options}
            product={product}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default MobileProductsModal;
