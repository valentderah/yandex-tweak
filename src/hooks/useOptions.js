import { useState, useEffect, useCallback } from "react";
import { DEFAULT_OPTIONS } from "../utils/constants";
import { storage } from "../utils/storage";

const useOptions = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const loadedOptions = await Promise.all(
          DEFAULT_OPTIONS.map(async (option) => {
            const items = await storage.get({ [option.id]: option.checked });
            return { ...option, checked: items[option.id] };
          })
        );
        setOptions(loadedOptions);
      } catch (error) {
        console.error("Failed to load options:", error);
        setOptions(DEFAULT_OPTIONS);
      }
    };

    loadOptions();
  }, []);

  const handleOptionChange = useCallback((changedId) => {
    setOptions((currentOptions) =>
      currentOptions.map((option) =>
        option.id === changedId
          ? { ...option, checked: !option.checked }
          : option
      )
    );
  }, []);

  const saveOptions = useCallback(async () => {
    const optionsToSave = options.reduce((acc, option) => {
      acc[option.id] = option.checked;
      return acc;
    }, {});

    try {
      await storage.set(optionsToSave);
    } catch (error) {
      console.error("Failed to save options:", error);
    }
  }, [options]);

  return { options, handleOptionChange, saveOptions };
};

export default useOptions;
