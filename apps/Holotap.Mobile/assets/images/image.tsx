

/* ============================================================================

   HoloTap Mobile Platform
   File: src/components/common/HoloTapBadge.tsx

   Engineers:
   - Raymond Newton (E5357171)
   - Copilot Engineering Assistant

   Layer: Presentation Layer (Shared UI Component)

   Revision: v5.1.0
   Date: 17 November 2026

   Copyright (c) 2026 HoloTap.
   All Rights Reserved.

   ----------------------------------------------------------------------------

   Module Purpose

   Provides a reusable HoloTap brand badge component for display throughout
   the mobile application, including authentication, payment flow, landing,
   onboarding and result screens.

   ----------------------------------------------------------------------------

   Module Responsibilities

   - Display HoloTap brand identity consistently.
   - Render the official HoloTap logo asset.
   - Maintain responsive sizing across devices.
   - Support screen composition and visual branding.
   - Centralise logo management into a single component.

   ============================================================================ */
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function HoloTapBadge() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/holotap-2026.png")}
        style={styles.badge}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  badge: {
    width: 160,
    height: 160,
  },
});
