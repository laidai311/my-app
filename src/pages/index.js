import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthUserContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/configs/firebase';
import Cookies from 'js-cookie';
import CustomEditor from '@/components/CustomEditor';
import BarLayout from '@/layouts/BarLayout';
import CustomCarousel from '@/components/CustomCarousel';
import CustomPlayer from '@/components/CustomPlayer';
import 'lazysizes';
import OverviewList from '@/components/ReactVitualized';
import { useRef, useState } from 'react';
import ListExample from '@/components/ReactVitualized/List';
import { useMutation, useQuery } from '@tanstack/react-query';
import dictionaryApi from '@/api/dictionary';
import Form from '@/components/Form';

const list = Array(200)
  .fill()
  .map((val, idx) => {
    return {
      id: idx,
      name: 'John Doe',
      image: 'http://via.placeholder.com/40',
      text: 'Điểm mấu chốt trong mô hình ODM là nhà sản xuất gốc (trong trường hợp này là Coosea)',
    };
  });

export default function HomePage() {
  const { authUser } = useAuth();

  const insertDictionary = useMutation({
    mutationFn: (data) => dictionaryApi.insertDictionary(data),
  });

  return (
    <>
      <Head>
        <title>DaiLai 9966</title>
      </Head>
      <main>
        <div className="border p-2 rounded-md inline-block">
          <Form
            onSubmit={(e, value) => {
              insertDictionary.mutate(value, {
                onSuccess: (success) => {
                  console.log(success);
                  e.target.reset();
                },
                onError: (error) => {
                  console.log(error);
                },
              });
            }}
          >
            <div className="flex flex-col space-y-2 max-w-xs">
              <input
                type="text"
                name="word"
                placeholder="Word"
                className="input input-bordered w-full"
                disabled={insertDictionary.isLoading}
              />
              <input
                type="text"
                name="translate"
                placeholder="Translate"
                className="input input-bordered w-full"
                disabled={insertDictionary.isLoading}
              />
              <button
                type="submit"
                className={`btn btn-primary ${
                  insertDictionary.isLoading ? 'loading' : ''
                }`}
              >
                Add
              </button>
            </div>
          </Form>
        </div>

        {/* <div
                    id="scroll-wrapper"
                    ref={(e) => setContainer(e)}
                    className="relative h-96 overflow-y-auto"
                >
                    <div className="h-96">abcdef</div>
                    <div className="h-96">abc</div>
                </div> */}
        {/* <OverviewList container={container} items={list} /> */}
        {/* <CustomCarousel
                    options={{
                        infinite: false,
                        initialPage: 0,
                        initialSlide: 0,
                        slidesPerPage: 1,
                        transition: "slide",
                        Dots: false,
                    }}
                >
                    <div class="f-carousel__slide">
                        <CustomPlayer />
                    </div>
                    <div
                        class="f-carousel__slide"
                        data-thumb-src="https://lipsum.app/id/31/192x144"
                    >
                        <img
                            width="640"
                            height="480"
                            alt=""
                            data-lazy-src="https://lipsum.app/id/31/640x480"
                        />
                    </div>
                    <div
                        class="f-carousel__slide"
                        data-thumb-src="https://lipsum.app/id/35/192x144"
                    >
                        <img
                            width="640"
                            height="480"
                            alt=""
                            data-lazy-src="https://lipsum.app/id/35/640x480"
                        />
                    </div>
                    <div
                        class="f-carousel__slide"
                        data-thumb-src="https://lipsum.app/id/34/192x144"
                    >
                        <img
                            width="640"
                            height="480"
                            alt=""
                            data-lazy-src="https://lipsum.app/id/34/640x480"
                        />
                    </div>
                    <div
                        class="f-carousel__slide"
                        data-thumb-src="https://lipsum.app/id/60/192x144"
                    >
                        <img
                            width="640"
                            height="480"
                            alt=""
                            data-lazy-src="https://lipsum.app/id/60/640x480"
                        />
                    </div>
                    <div
                        class="f-carousel__slide"
                        data-thumb-src="https://lipsum.app/id/33/192x144"
                    >
                        <img
                            width="640"
                            height="480"
                            alt=""
                            data-lazy-src="https://lipsum.app/id/33/640x480"
                        />
                    </div>
                    <div
                        class="f-carousel__slide"
                        data-thumb-src="https://lipsum.app/id/59/192x144"
                    >
                        <img
                            width="640"
                            height="480"
                            alt=""
                            data-lazy-src="https://lipsum.app/id/59/640x480"
                        />
                    </div>
                    <div
                        class="f-carousel__slide"
                        data-thumb-src="https://lipsum.app/id/37/192x144"
                    >
                        <img
                            width="640"
                            height="480"
                            alt=""
                            data-lazy-src="https://lipsum.app/id/37/640x480"
                        />
                    </div>
                </CustomCarousel> */}
        {/* <button className="btn btn-primary">Button</button>
        <div className="">
          {authUser ? (
            <button
              className="btn btn-accent"
              onClick={() => {
                signOut(auth).then(() => {
                  setUser(null);
                  Cookies.remove('user');
                });
              }}
            >
              Sign out
            </button>
          ) : (
            <Link href="/sign-in" className="btn btn-primary">
              Sign in
            </Link>
          )}
        </div> */}

        <div className="">
          <Link href="/admin" className="btn">
            Admin
          </Link>
        </div>
        {/* The button to open modal */}
        <label htmlFor="my-modal" className="btn">
          open modal
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                Yay!
              </label>
            </div>
          </div>
        </div>
        {/* <CustomEditor /> */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your name?</span>
            <span className="label-text-alt">Top Right label</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs appearance-none"
          />
          <label className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your bio</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 text-base appearance-none"
            placeholder="Bio"
          ></textarea>
          <label className="label">
            <span className="label-text-alt">Your bio</span>
            <span className="label-text-alt">Alt label</span>
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pick a file</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <input
            accept="image/*"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt">Alt label</span>
            <span className="label-text-alt">Alt label</span>
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pick a file</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <input
            accept="video/*"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt">Alt label</span>
            <span className="label-text-alt">Alt label</span>
          </label>
        </div>
      </main>
    </>
  );
}

HomePage.getLayout = (page) => <BarLayout>{page}</BarLayout>;
