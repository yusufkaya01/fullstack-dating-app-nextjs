"use client";
import React, { Suspense, useState } from "react";
import StarButton from "./StarButton";
import DeleteButton from "./DeleteButton";
import { Photo } from "@prisma/client";
import MemberImage from "./MemberImage";
import { deleteImage, setMainImage } from "@/actions/uploadImageAction";
import Loading from "./Loading";

type Props = {
  photos: Photo[];
  editable?: boolean;
  mainImage?: string | null;
};

const MemberPhotos = ({ photos, editable, mainImage }: Props) => {
  const [loading, setLoading] = useState({
    isLoading: false,
    id: "",
    type: "",
  });

  const handleSetMain = async (photo: Photo) => {
    if (mainImage === photo.url) return;
    setLoading({ isLoading: true, id: photo.id, type: "main" });

    await setMainImage(photo);
    setLoading({ isLoading: false, id: "", type: "" });
  };

  const handleDelete = async (photo: Photo) => {
    if (mainImage === photo.url) return;
    setLoading({ isLoading: true, id: photo.id, type: "delete" });

    await deleteImage(photo);
    setLoading({ isLoading: false, id: "", type: "" });
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-3 p-5">
        {photos &&
          photos.map((photo) => {
            return (
              <div key={photo.id} className="relative">
                <MemberImage photo={photo} />
                {editable && (
                  <>
                    <Suspense fallback={<Loading />}>
                      <div
                        className="absolute top-3 left-3 z-50"
                        onClick={() => handleSetMain(photo)}
                      >
                        <StarButton
                          loading={
                            loading.isLoading &&
                            loading.id === photo.id &&
                            loading.type === "main"
                              ? true
                              : false
                          }
                          selected={mainImage === photo.url ? true : false}
                        />{" "}
                      </div>
                    </Suspense>

                    <Suspense fallback={<Loading />}>
                      <div
                        className="absolute top-3 right-3 z-50"
                        onClick={() => handleDelete(photo)}
                      >
                        <DeleteButton
                          loading={
                            loading.isLoading &&
                            loading.id === photo.id &&
                            loading.type === "delete"
                              ? true
                              : false
                          }
                        />{" "}
                      </div>
                    </Suspense>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MemberPhotos;
