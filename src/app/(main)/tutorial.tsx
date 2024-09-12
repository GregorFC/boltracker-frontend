import { useState, useEffect, createContext } from "react";
import Joyride, { Step, CallBackProps, STATUS, EVENTS } from "react-joyride";
import { useAppData } from "../contexts/AppProvider";
import { useTranslation } from 'react-i18next';




export const TourContext = createContext({
    restartTour: () => {},
  });

  
const TutorialStep = (...msgs: string[]) => {
    const { t } = useTranslation();
    
    return (
      <div>
        <div>
          <div>
            {
                msgs.map((msg, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: t(msg) }} />
                ))
            }
          </div>
        </div>
      </div>
    );
  };
  
  export default TutorialStep;
  
  
  interface TutorialProviderProps {
    children: React.ReactNode;
  }
  
  export function TutorialProvider({ children }: TutorialProviderProps) {
    const [run, setRun] = useState(false);
    const { user } = useAppData();
    const { t } = useTranslation();


  const steps: Step[] = [
    {
      title: t('tutorial.welcome_title'),
      target: 'body',
      content: TutorialStep('tutorial.welcome', 'tutorial.welcome_1'),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '#product-table',
      content: TutorialStep('tutorial.step2'),
      placement: 'bottom',
    },
    {
      target: '#product-table-mobile',
      content: TutorialStep('tutorial.step2'),
      placement: 'bottom',
    },
    {
      target: '.date-range',
      content: TutorialStep('tutorial.step3'),
      placement: 'bottom',
    },
    {
      target: '#revenue-table-head',
      content: TutorialStep('tutorial.step4'),
      placement: 'top',
    },
    {
      target: '#revenue-table-head-mobile',
      content: TutorialStep('tutorial.step4'),
      placement: 'bottom',
    },
    {
      title: t('tutorial.step5_title'),
      target: '#button-add-product',
      content: TutorialStep('tutorial.step5', 'tutorial.step5_1'),
      placement: 'right',
    },
    {
      target: '#product-list',
      content: TutorialStep('tutorial.step6'),
      placement: 'right',
    },
    { // mobile only
      target: '#mobile-sidebar-trigger',
      content: TutorialStep('tutorial.step7'),
      placement: 'right',
    },
    {
      target: '#user-profile',
      content: TutorialStep('tutorial.step8'),
      placement: 'top',
    },
    {
      target: '#user-profile-mobile',
      content: TutorialStep('tutorial.step9'),
      placement: 'top',
    },
    {
      title: t('tutorial.done_title'),
      target: 'body',
      content: TutorialStep('tutorial.done', 'tutorial.done_1', 'tutorial.done_2', 'tutorial.done_3'),
      placement: 'center',
    },
  ];
  
    const restartTour = () => {
      document.cookie = "tutorial=; max-age=0; path=/";
      setRun(false);
      setTimeout(() => {
        setRun(true);
      }, 100);
    };
  
    useEffect(() => {
      if (typeof document !== "undefined") {
        const shouldRunTutorial = () => {
          return document.cookie.indexOf("tutorial=done") === -1 && user?.subscription === 0;
        };
        setRun(shouldRunTutorial());
      }
    }, [user]);
  
    const handleJoyrideCallback = (data: CallBackProps) => {
      const { status, type } = data;
  
      // Listen for the 'finished' or 'skipped' status to set the cookie
      if (
        status === STATUS.FINISHED ||
        status === STATUS.SKIPPED ||
        (type === EVENTS.TOUR_END && status === STATUS.READY)
      ) {
        document.cookie = "tutorial=done; max-age=31536000; path=/";
        setRun(false);
      }
    };
  
    return (
      <TourContext.Provider value={{ restartTour }}>
        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          showSkipButton={true}
          disableOverlayClose={true}
          spotlightClicks={false}
          locale={{
            back: "Back",
            close: "Close",
            last: "Finish",
            next: "Next",
            skip: "Skip",
          }}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              zIndex: 10000,
              primaryColor: "#16302b",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              height: "100vh",
              top: 0,
              bottom: 0,
            },
            spotlight: {
              zIndex: 10010,
            },
          }}
        />
        {children}
      </TourContext.Provider>
    );
  }