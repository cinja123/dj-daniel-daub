import axios from 'axios';

export const sendEmailConfirmation = async(formData: Record<string, any>) => {
  try {
    const data = await axios.post(`http://localhost:5500/sendEmail/confirmation`, {
      eventData: formData,
    });
  } catch (error) {
    console.log(error);
  }
}