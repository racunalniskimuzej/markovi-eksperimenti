#
# Copyright (c) 2016 Adrian Guenter
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=mgetty
PKG_VERSION:=1.1.37+4a8e736.20160223
PKG_RELEASE:=1
PKG_LICENSE:=GPL-2.0
PKG_LICENSE_FILE:=COPYING
PKG_MAINTAINER:=Adrian Guenter <a@gntr.me>

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/adrianguenter/mgetty.git
PKG_SOURCE_VERSION:=4a8e736480f9b36feb21738e6b33b6fd7308ea67
PKG_SOURCE_SUBDIR:=$(PKG_NAME)-$(PKG_VERSION)
PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz

include $(INCLUDE_DIR)/package.mk

define Package/mgetty/Default
  SUBMENU:=Telephony
  URL:="http://mgetty.greenie.net/
  MAINTAINER:=$(PKG_MAINTAINER)
endef

prefix:=/opt
bin:=$(prefix)/bin
sbin:=$(prefix)/sbin
conf:=$(prefix)/etc/mgetty
lib:=$(prefix)/lib/mgetty
spool:=$(prefix)/var/spool
man:=$(prefix)/share/man/man

PKG_INSTALL_DIR:="$(PKG_BUILD_DIR)/install_root"

CONFIGURE_VARS += \
  CC="$(TARGET_CC)" \
  CXX="$(TARGET_CC) +.c++" \
  CFLAGS="$(TARGET_CFLAGS) -Wall -DAUTO_PPP" \
  LDFLAGS="$(TARGET_LDFLAGS)" \
  HOSTCC="$(HOSTCC_NOCACHE)" \
  HOSTCFLAGS="-O2 -Wall" \
  ECHO="echo" \
  INSTALL="install -c --strip-program=$(word 1,$(STRIP))" \
  prefix="$(prefix)" \
  spool="$(spool)" \
  FAX_SPOOL="$(spool)/fax" \
  FAX_SPOOL_IN="$(spool)/fax/in" \
  FAX_SPOOL_OUT="$(spool)/fax/out" \
  FAX_OUT_USER="0" \
  PHONE_GROUP="dialout" \
  PHONE_PERMS="770" \
  LIBDIR="$(lib)" \
  CONFDIR="$(conf)" \
  MAN1DIR="$(man)1" \
  MAN4DIR="$(man)4" \
  MAN5DIR="$(man)5" \
  MAN8DIR="$(man)8" \

define Build/Configure
	@echo -e "\n=== Build/Configure ==="
	$(call Build/Configure/Default,--with-linux-headers=$(LINUX_DIR))
endef

define Build/Compile
	@echo -e "\n=== Build/Compile ==="
	$(CONFIGURE_VARS) $(MAKE) -C $(PKG_BUILD_DIR) \
		all \
		login.config \
		mgetty.config \
		sendfax.config \
		vgetty \
		
endef

define Build/Install
	@echo -e "\n=== Build/Install ==="
	@# Nada
endef

#define Build/InstallDev
#	$(call Build/InstallDev/Default,)
#endef


# === mgetty ===
define Package/mgetty
  $(call Package/mgetty/Default)
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Smart modem getty
  DEPENDS:=
endef

define Package/mgetty/description
 Mgetty is a "smart" getty replacement, designed to be used with  hayes 
 compatible data and data/fax modems. Mgetty knows about modem initialization, 
 manual modem answering (so your modem doesn't answer if the machine isn't 
 ready), UUCP locking (so you can use the same device for dial-in and dial-out).
 Mgetty provides very extensive logging facilities.
endef

define Package/mgetty/conffiles
$(conf)/dialin.config
$(conf)/login.config
$(conf)/mgetty.config
endef

define Package/mgetty/install
	$(INSTALL_DIR) $(1)/{$(sbin),$(conf),$(lib)}
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/mgetty $(1)/$(sbin)/
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/{dialin,login,mgetty}.config $(1)/$(conf)/
endef


# === mgetty-sendfax ===

define Package/mgetty-sendfax
  $(call Package/mgetty/Default)
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Send group 3 fax files (G3) with a class 2 faxmodem
  DEPENDS:=+mgetty
endef

define Package/mgetty-sendfax/description
 Sends g3 fax files to a specified phone number. The g3 files can be created with 
 pbm2g3 (mgetty-g3tools) or GhostScript.
endef

define Package/mgetty-sendfax/conffiles
$(conf)/sendfax/sendfax.config
endef

define Package/mgetty-sendfax/install
	$(INSTALL_DIR) $(1)/{$(bin),{$(conf),$(lib)}/fax}
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/sendfax $(1)/$(bin)/
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/sendfax.config $(1)/$(conf)/fax/
endef


# === mgetty-g3tools ===

define Package/mgetty-g3tools
  $(call Package/mgetty/Default)
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Utilities for converting group 3 fax files
  DEPENDS:=
endef

define Package/mgetty-g3tools/description
endef

define Package/mgetty-g3tools/install
	$(INSTALL_DIR) $(1)/$(bin)
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/g3/{g3cat,g32pbm,pbm2g3,sff2g3} $(1)/$(bin)/
endef


# === mgetty-faxspool ===

define Package/mgetty-faxspool
  $(call Package/mgetty/Default)
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Utilities for managing an mgetty fax spool
  DEPENDS:=+perlbase-essential +perlbase-getopt +perlbase-io +perlbase-posix +mgetty-sendfax +mgetty-g3tools
endef

define Package/mgetty-faxspool/description
endef

define Package/mgetty-faxspool/install
	$(INSTALL_DIR) $(1)/{$(bin),$(sbin),$(conf)/fax,$(lib)/fax,$(spool)/fax/{in,out}}
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/{newslock,fax/{faxcvt,faxq,faxrm,faxrunq,faxspool}} $(1)/$(bin)/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/fax/faxrunqd $(1)/$(sbin)/
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/fax/faxheader $(1)/$(conf)/fax/
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/fax/faxspool.rules $(1)/$(conf)/fax/faxspool.rules.example
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/fax/{etc-magic,faxq-helper,*.pbm} $(1)/$(lib)/fax/
endef

# Don't auto-enable services

#define Package/mgetty-faxspool/postinst
##!/bin/sh
## check if we are on real system
#if [ -z "$${IPKG_INSTROOT}" ]; then
#        echo "Enabling rc.d symlink for faxrunqd"
#        /etc/init.d/faxrunqd  enable
#fi
#exit 0
#endef

#define Package/mgetty-faxspool/prerm
##!/bin/sh
## check if we are on real system
#if [ -z "$${IPKG_INSTROOT}" ]; then
#        echo "Removing rc.d symlink for faxrunqd"
#        /etc/init.d/faxrunqd disable
#fi
#exit 0
#endef


# === mgetty-pvftools ===

define Package/mgetty-pvftools
  $(call Package/mgetty/Default)
  CATEGORY:=Utilities
  TITLE:=Utilities for converting raw modem voice files
endef

define Package/mgetty-pvftools/description
endef

define Package/mgetty-pvftools/install
	$(INSTALL_DIR) $(1)/$(bin)
	find $(PKG_BUILD_DIR)/voice/pvftools/ -maxdepth 1 -type f -executable -print0 \
	 | xargs -0 -I'{}' $(INSTALL_BIN) '{}' $(1)/$(bin)/
endef


# === mgetty-voice ===

define Package/mgetty-voice
  $(call Package/mgetty/Default)
  CATEGORY:=Utilities
  TITLE:=mgetty voice extension (vgetty)
  DEPENDS:=+mgetty +mgetty-pvftools
  USERID:=
endef

define Package/mgetty-voice/description
 Vgetty turns your voice modem into an answering machine. It adds voice 
 capabilities to mgetty. This means, that you can handle data, fax and voice 
 calls on one telephone line. How good all this works depends strongly on the 
 modem you have. There are many modems with bad voice implementations and quite 
 a few more expensive ones with a good hardware and firmware.
endef

define Package/mgetty-voice/install
	$(INSTALL_DIR) $(1)/{$(bin),$(sbin),$(conf)}
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/voice/vm/vm $(1)/$(bin)/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/voice/vgetty/vgetty $(1)/$(sbin)/
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/voice/voice.conf-dist $(1)/$(conf)/
endef


# === init ===

$(eval $(call BuildPackage,mgetty))
$(eval $(call BuildPackage,mgetty-sendfax))
$(eval $(call BuildPackage,mgetty-g3tools))
$(eval $(call BuildPackage,mgetty-faxspool))
$(eval $(call BuildPackage,mgetty-pvftools))
$(eval $(call BuildPackage,mgetty-voice))

debug:
	$(foreach v, $(.VARIABLES), $(info $(v) = $($(v))))

