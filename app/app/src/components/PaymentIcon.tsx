interface PaymentIconProps {
  type: string;
}

export default function PaymentIcon(props: PaymentIconProps) {
  return (
    <>
      {props.type === "card" && (
        <svg
          className="payment-method"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          data-tags="credit-card"
        >
          <g transform="scale(0.01953125 0.01953125)">
            <path d="M921.6 153.6h-819.2c-56.371 0-102.4 46.080-102.4 102.4v512c0 56.32 46.029 102.4 102.4 102.4h819.2c56.32 0 102.4-46.080 102.4-102.4v-512c0-56.32-46.080-102.4-102.4-102.4zM921.6 768h-819.2v-307.2h819.2v307.2zM921.6 307.2h-819.2v-51.2h819.2v51.2zM204.8 568.32v30.72h30.72v-30.72h-30.72zM389.12 629.709v30.771h61.44v-30.771h30.72v-30.72h30.72v-30.72h-61.44v30.72h-30.771v30.72h-30.669zM512 660.48v-30.771h-30.771v30.771h30.771zM358.4 660.48v-30.771h-61.44v30.771h61.44zM389.12 598.989h30.72v-30.72h-61.44v61.389h30.72v-30.669zM266.189 629.709h30.771v-30.72h30.72v-30.72h-61.44v30.72h-30.72v30.72h-30.72v30.771h61.389v-30.771z" />
          </g>
        </svg>
      )}
      {props.type === "cash" && (
        <svg
          className="payment-method"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          data-tags="banknote,check,bill,money,cash"
        >
          <g transform="scale(0.03125 0.03125)">
            <path d="M1005.28 338.752l-320-320c-15.872-15.872-38.88-22.24-60.672-16.864-11.488 2.816-21.76 8.736-29.888 16.864-7.264 7.264-12.736 16.256-15.872 26.304-14.496 47.008-39.552 87.872-76.64 124.928-49.536 49.504-114.048 87.008-182.304 126.656-72.448 41.984-147.296 85.504-208.64 146.816-52.128 52.192-87.616 110.24-108.416 177.632-7.008 22.752-0.896 47.36 15.872 64.192l320 320c15.872 15.872 38.88 22.24 60.672 16.864 11.488-2.88 21.76-8.736 29.888-16.864 7.264-7.264 12.736-16.256 15.872-26.368 14.528-47.008 39.584-87.872 76.704-124.928 49.504-49.504 113.984-86.944 182.304-126.56 72.384-42.048 147.264-85.568 208.576-146.88 52.128-52.128 87.616-110.24 108.448-177.632 6.976-22.72 0.832-47.424-15.904-64.16zM384 960c-105.984-105.984-214.016-214.048-320-320 90.944-294.432 485.12-281.568 576-576 105.984 105.952 214.048 214.016 320.064 320-90.976 294.368-485.152 281.568-576.064 576zM625.984 476.8c-10.432-8.736-20.928-14.688-31.488-17.632-10.496-2.944-20.992-4.128-31.616-3.36-10.496 0.8-21.248 3.2-32 7.328-10.752 4.192-21.568 8.736-32.448 14.016-17.184-19.744-34.368-39.264-51.552-57.376 7.744-7.008 15.264-10.56 22.496-10.816 7.264-0.32 14.24 0.448 20.864 2.112 6.752 1.696 12.928 3.136 18.624 4.256 5.76 1.12 10.752-0.128 15.136-3.808 4.64-4 7.2-9.184 7.552-15.424 0.32-6.304-2.048-12.448-7.328-18.432-6.752-7.744-14.88-12.448-24.64-14.176-9.632-1.696-19.488-1.568-29.76 0.672-10.112 2.304-19.744 6.112-28.864 11.488s-16.448 10.88-21.888 16.256c-2.080-1.984-4.16-3.936-6.24-5.888-2.304-2.112-5.184-3.264-8.64-3.2-3.488 0-6.368 1.504-8.736 4.256-2.304 2.688-3.36 5.824-2.944 9.12 0.32 3.424 1.696 6.048 4.064 8.064 2.080 1.76 4.16 3.488 6.24 5.312-8.192 9.888-14.944 20.8-20.256 32.32-5.376 11.552-8.576 23.008-9.76 34.112-1.248 11.2-0.064 21.44 3.36 30.944 3.424 9.568 9.76 17.696 19.008 25.376 15.072 12.512 32.8 17.824 53.376 16.64 20.512-1.248 42.624-7.36 66.4-20.128 18.88 21.824 37.824 43.488 56.736 63.616-8 6.752-15.008 10.624-21.184 11.872-6.176 1.312-11.68 1.184-16.672-0.32-4.992-1.568-9.632-3.808-13.888-6.688-4.256-2.944-8.448-5.44-12.64-7.488-4.128-2.048-8.384-3.2-12.736-3.264s-8.992 2.048-14.112 6.432c-5.248 4.576-7.872 9.888-7.872 15.872 0 5.952 2.752 12 8.128 18.112 5.44 6.112 12.512 11.264 21.056 15.328s18.208 6.624 28.832 7.328c10.624 0.736 21.824-0.864 33.632-5.248 11.872-4.32 23.616-12.128 35.2-23.744 5.568 5.44 11.2 10.624 16.8 15.616 2.368 2.048 5.248 3.072 8.736 2.816 3.36-0.128 6.304-1.696 8.64-4.512 2.368-2.88 3.36-6.048 3.008-9.376-0.32-3.36-1.696-5.952-4-7.808-5.632-4.512-11.264-9.248-16.864-14.24 9.568-11.744 17.248-24.128 22.944-36.384 5.696-12.32 9.056-24.192 10.176-35.2 1.12-11.072-0.192-21.056-3.808-30.112-3.584-9.184-9.952-17.056-19.072-24.64zM447.072 498.496c-9.056 0.384-16.96-2.624-23.872-9.312-2.944-2.816-4.992-6.24-6.24-10.304-1.312-4.064-1.76-8.512-1.248-13.376 0.448-4.8 1.888-9.824 4.384-14.88 2.368-5.056 5.888-10.112 10.368-15.008 16.224 16.128 32.416 33.824 48.64 52.128-12.288 6.752-22.976 10.368-32.032 10.752zM598.016 562.56c-2.88 5.312-6.176 10.048-10.048 14.176-17.952-18.112-35.872-38.016-53.76-58.432 4.576-2.048 9.376-4.192 14.56-6.368s10.368-3.616 15.552-4.512c5.312-0.8 10.56-0.576 15.808 0.672 5.184 1.312 10.112 4.128 14.688 8.576 4.512 4.512 7.36 9.184 8.512 14.24 1.248 5.12 1.312 10.304 0.448 15.616-0.928 5.344-2.816 10.656-5.76 16.032zM470.944 709.76c6.304-5.088 15.584-4.832 21.376 1.056 6.272 6.24 6.272 16.448 0 22.688-0.512 0.512-1.056 0.864-1.632 1.312l0.064 0.064c-20.256 15.392-36.896 29.248-54.848 47.2-16.224 16.192-30.88 33.248-43.552 50.56l-20.448 28c-0.64 1.152-1.408 2.208-2.368 3.2-6.272 6.24-16.48 6.24-22.72 0-5.44-5.44-6.112-13.824-2.112-20.064l-0.064-0.064 21.888-29.888c13.664-18.688 29.376-36.992 46.752-54.368 18.080-18.144 37.6-34.336 57.6-49.696h0.064zM588.096 246.88c16.192-16.192 30.816-33.184 43.52-50.592l21.248-29.12c0.768-1.376 1.632-2.752 2.816-3.936 6.304-6.304 16.512-6.304 22.816 0 5.984 6.016 6.24 15.52 0.8 21.888l0.064 0.064-21.888 30.016c-13.696 18.688-29.376 36.928-46.752 54.304-18.080 18.080-37.568 34.336-57.568 49.696l-0.128-0.064c-6.368 5.856-16.256 5.728-22.368-0.448-6.304-6.304-6.304-16.576 0-22.88 1.12-1.184 2.432-2.016 3.744-2.752 18.816-14.368 36.96-29.44 53.696-46.176z" />
          </g>
        </svg>
      )}
      {props.type !== "cash" && props.type !== "card" && (
        <svg
          className="payment-method"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          data-tags="contactless"
        >
          <g transform="scale(0.0234375 0.0234375)">
            <path d="M626 740q56-114 56-228 0-116-56-228l-58 30q50 98 50 198t-50 200zM492 684q42-74 42-166 0-94-42-174l-56 28q34 72 34 146 0 72-34 134zM360 616q24-52 24-106 0-48-24-102l-58 26q18 36 18 76 0 42-18 80zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125z" />
          </g>
        </svg>
      )}
    </>
  );
}
