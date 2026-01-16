import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalInfoStep = ({ formData, errors, onChange, onPhotoUpload, photoPreview }) => {
  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const file = e?.dataTransfer?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      onPhotoUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Personal Information
        </h2>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Let's start with your basic details
        </p>
      </div>
      <div className="flex justify-center mb-6 md:mb-8">
        <div
          className="relative group"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full glass-panel-strong overflow-hidden border-4 border-accent/20 group-hover:border-accent/40 transition-all duration-300">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="Profile photo preview showing uploaded user image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Icon name="User" size={48} />
              </div>
            )}
          </div>
          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent text-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg"
          >
            <Icon name="Camera" size={20} />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={onChange}
          error={errors?.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={onChange}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="your.email@example.com"
        value={formData?.email}
        onChange={onChange}
        error={errors?.email}
        description="We'll send a verification link to this email"
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="+1 (555) 000-0000"
        value={formData?.phone}
        onChange={onChange}
        error={errors?.phone}
        description="For appointment reminders and updates"
        required
      />
      <Input
        label="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={formData?.dateOfBirth}
        onChange={onChange}
        error={errors?.dateOfBirth}
        required
      />
    </div>
  );
};

export default PersonalInfoStep;
